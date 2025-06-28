export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  const body = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: body.messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]) {
    console.error('OpenAI API error:', data);
    return new Response(JSON.stringify({ error: 'OpenAI API failed. Check logs.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const reply = data.choices[0].message;

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
