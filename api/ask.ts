import type { VercelRequest, VercelResponse } from '@vercel/node';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  runtime: 'nodejs18.x',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ answer: 'Method not allowed' });
    return;
  }

  try {
    const { question = '' } = req.body || {};
    if (!question) {
      res.status(200).json({ answer: 'No question provided.' });
      return;
    }

    const filePath = path.join(process.cwd(), 'Data', 'PersonalPortfolioDataset.json');
    const raw = await fs.readFile(filePath, 'utf8');
    const entries: { content: string }[] = JSON.parse(raw);
    const context = entries.map(e => e.content).join('\n\n');

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ answer: 'Missing API key' });
      return;
    }

    const messages = [
      {
        role: 'system',
        content: "You are Ayush Patel's portfolio assistant. Use the provided context to answer questions.",
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages }),
    });

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim() || 'No answer';
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: 'Error processing your request.' });
  }
}
