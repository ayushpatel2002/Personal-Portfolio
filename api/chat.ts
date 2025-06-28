import { NextRequest, NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export default async function handler(req: NextRequest) {
  const body = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_API_KEY_HERE`, // Replace with env var in Vercel
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: body.messages,
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message;

  return NextResponse.json({ reply });
}
