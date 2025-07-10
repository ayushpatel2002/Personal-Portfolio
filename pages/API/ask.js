export default async function handler(req, res) {
  const backendURL = "http://16.176.171.21:8080/ask";

  try {
    const backendRes = await fetch(backendURL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers || {}),
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}