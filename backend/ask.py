from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
# from query import query_index  # this is your RAG logic

load_dotenv()

app = FastAPI()

# Allow frontend requests (dev only; restrict later in prod)
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
        return {"answer": f"You asked: {question}"}
    except Exception as e:
        print("❌ Error in /ask:", e)
        return {"answer": "Something went wrong"}