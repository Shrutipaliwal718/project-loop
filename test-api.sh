#!/bin/bash

# Make sure your Next.js server is running on port 3000 (npm run dev)
API_URL="http://localhost:3000/api"

echo "======================================"
echo "🧪 Testing Project LOOP AI Backend 🧪"
echo "======================================"
echo ""

echo "1. Testing Real Company Ingestion (/api/workspace/ingest-real)..."
curl -s -X POST "$API_URL/workspace/ingest-real" \
     -H "Content-Type: application/json" \
     -d '{"companyName": "Flipkart"}'
echo -e "\n\n"

echo "2. Testing AI Trends Detection (/api/ai/trends)..."
curl -s -X GET "$API_URL/ai/trends" -H "Content-Type: application/json"
echo -e "\n\n"

echo "3. Testing Ask LOOP RAG Vector Search (/api/ai/ask-loop)..."
curl -s -X POST "$API_URL/ai/ask-loop" \
     -H "Content-Type: application/json" \
     -d '{"query": "Why are customers complaining about checkout?", "companyName": "Flipkart"}'
echo -e "\n\n"

echo "4. Testing AI VoC Report Generation (/api/reports/generate)..."
curl -s -X POST "$API_URL/reports/generate" \
     -H "Content-Type: application/json" \
     -d '{"companyName": "Flipkart"}'
echo -e "\n\n"

echo "✅ Testing Complete!"
