from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Fake RAG logic
def query_index(question: str) -> str:
    return f"(Mocked RAG Answer) Response to: {question}"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask(request: Request):
    print("⚡ /ask endpoint was called")
    try:
        body = await request.json()
        question = body.get("question", "")
        print("✅ Question received:", question)
        answer = query_index(question)
        print("🤖 RAG Answer:", answer)
        return {"answer": answer}
    except Exception as e:
        print("❌ Error in /ask:", e)
        return {"answer": "Something went wrong"}