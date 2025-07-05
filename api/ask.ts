export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  try {
    const { question } = await request.json();
    if (!question) {
      return new Response(
        JSON.stringify({ error: 'No question provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Lazy-load heavy modules only when needed
    const [{ default: OpenAI }, fs] = await Promise.all([
      import('openai').then((m) => m.default || m),
      import('fs/promises'),
    ]);
    const path = (await import('path')).default;

    const dataPath = path.join(process.cwd(), 'public', 'PersonalPortfolioDataset.json');
    const raw = await fs.readFile(dataPath, 'utf-8');
    const dataset = JSON.parse(raw) as Array<{ title: string; summary: string; content: string }>;
    const context = dataset
      .map((d) => `${d.title}\n${d.summary}\n${d.content}`)
      .join('\n\n');

    const openai = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: "You are Ayush Patel's portfolio assistant. Use the provided context to answer questions.",
        },
        { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}` },
      ],
      temperature: 0.7,
    });

    const answer = completion.choices?.[0]?.message?.content?.trim() || '';

    return new Response(JSON.stringify({ answer }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('ask error', error);
    return new Response(
      JSON.stringify({ error: 'Server error. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
