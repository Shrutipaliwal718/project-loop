import { Sentiment } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';
import { pipeline } from '@xenova/transformers';

export interface ClassificationResult {
  sentiment: Sentiment;
  sentimentScore: number;
  category: string;
  keyQuote?: string;
}

let embedder: any = null;

/**
 * Generate 384-dimensional vector embedding using Local Transformers
 */
export async function generateEmbedding(text: string): Promise<number[] | null> {
  try {
    if (!embedder) {
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await embedder(text.replace(/\n/g, ' '), { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
}

/**
 * Helper to generate and store embedding in the database
 */
export async function storeFeedbackEmbedding(feedbackId: string, title: string, content: string, category: string) {
  
  const textToEmbed = `Title: ${title}\nContent: ${content}\nCategory: ${category}`;
  const embedding = await generateEmbedding(textToEmbed);
  
  if (embedding) {
    const embeddingString = `[${embedding.join(',')}]`;
    try {
      await prisma.$executeRawUnsafe(`
        INSERT INTO vector_embeddings (id, content, embedding, "feedbackId", "createdAt")
        VALUES (gen_random_uuid(), $1, $2::vector, $3, NOW())
      `, textToEmbed, embeddingString, feedbackId);
    } catch (err) {
      console.error('Failed to insert vector embedding:', err);
    }
  }
}

/**
 * Auto-classifies customer feedback using REAL Anthropic Claude API
 */
export async function classifyFeedback(title: string, content: string): Promise<ClassificationResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey) {
    try {
      const anthropic = new Anthropic({ apiKey });
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are an enterprise customer feedback intelligence AI. Analyze this customer feedback and return ONLY a raw valid JSON object without markdown fences:

Title: "${title}"
Content: "${content}"

JSON structure:
{
  "sentiment": "Positive" | "Negative" | "Neutral" | "Mixed",
  "sentimentScore": float between -1.0 and 1.0,
  "category": "Billing" | "UX/UI Navigation" | "Performance" | "Bug" | "Feature Request" | "Customer Support"
}`,
          },
        ],
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      const cleanedJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanedJson);

      return {
        sentiment: parsed.sentiment as Sentiment,
        sentimentScore: parseFloat(parsed.sentimentScore),
        category: parsed.category || 'General',
      };
    } catch (err) {
      console.warn('Real Anthropic API error:', err);
    }
  }

  // Fallback if API key has rate limit or error
  return {
    sentiment: Sentiment.Neutral,
    sentimentScore: 0.1,
    category: 'General',
  };
}

/**
 * Ask LOOP RAG Q&A Engine using pgvector Semantic Search + Anthropic Claude API
 */
export async function answerRAGQuery(query: string, workspaceId: string) {
  const claudeApiKey = process.env.ANTHROPIC_API_KEY;

  let topFeedbacks: any[] = [];

  // Step 1 & 2: Generate Query Embedding & Perform Vector Search
  const queryEmbedding = await generateEmbedding(query);
  if (queryEmbedding) {
      const embeddingString = `[${queryEmbedding.join(',')}]`;
      
      try {
        // Find top 10 most semantically similar feedbacks in the workspace
        topFeedbacks = await prisma.$queryRawUnsafe(`
          SELECT f.id, f.title, f.channel, f.category, f.sentiment, f.content,
                 (v.embedding <=> $1::vector) as distance
          FROM vector_embeddings v
          JOIN feedbacks f ON v."feedbackId" = f.id
          WHERE f."workspaceId" = $2
          ORDER BY distance ASC
          LIMIT 10;
        `, embeddingString, workspaceId);
      } catch (err) {
        console.error('Vector search error:', err);
      }
    }

  // Fallback if vector search failed or keys are missing: just grab recent 10
  if (!topFeedbacks || topFeedbacks.length === 0) {
    topFeedbacks = await prisma.feedback.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  const contextText = topFeedbacks
    .map((fb) => `[Ticket ID: ${fb.id}] Title: ${fb.title} | Channel: ${fb.channel} | Category: ${fb.category} | Sentiment: ${fb.sentiment} | Content: ${fb.content}`)
    .join('\n');

  if (claudeApiKey) {
    try {
      const anthropic = new Anthropic({ apiKey: claudeApiKey });
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are Project LOOP "Ask LOOP" AI assistant. Answer the user question based ONLY on the following customer feedback context dataset:

${contextText}

User Question: "${query}"

Synthesize a clear, executive-grade factual answer citing specific trends, customer sentiments, and ticket IDs. If the context doesn't contain the answer, politely state that.`,
          },
        ],
      });

      const answer = response.content[0].type === 'text' ? response.content[0].text : '';

      return {
        answer,
        sources: topFeedbacks.map((s) => ({
          id: s.id,
          title: s.title,
          channel: s.channel,
          sentiment: s.sentiment,
          category: s.category,
          content: s.content,
        })),
      };
    } catch (err) {
      console.warn('Real Anthropic RAG Error:', err);
    }
  }

  return {
    answer: `Based on semantic similarity search: The system retrieved relevant tickets, but AI text generation failed. Please check your API keys.`,
    sources: topFeedbacks.map((s) => ({
      id: s.id,
      title: s.title,
      channel: s.channel,
      sentiment: s.sentiment,
      category: s.category,
      content: s.content,
    })),
  };
}
