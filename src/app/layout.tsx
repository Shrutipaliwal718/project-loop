import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOOP — Customer Feedback Intelligence",
  description:
    "AI-powered customer feedback intelligence platform that turns feedback into actionable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
