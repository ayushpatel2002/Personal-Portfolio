export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ reply: { content: '❌ Invalid request format.' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      return new Response(
        JSON.stringify({ reply: { content: '❌ Server misconfiguration. Missing API key.' } }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    if (!data.choices?.[0]?.message) {
      const errorMsg = data.error?.message || 'Unknown error';
      console.error('OpenAI API error:', errorMsg, data);
      return new Response(
        JSON.stringify({ reply: { content: `❌ OpenAI error: ${errorMsg}` } }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const reply = data.choices[0].message;

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ reply: { content: '❌ Server error. Please try again later.' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
