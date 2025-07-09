from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from query import query_index  # this is your RAG logic

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
    body = await request.json()
    question = body.get("question", "")
    print("✅ Received question:", question)
    if not question:
        return {"answer": "No question provided."}
    try:
        answer = query_index(question)
        return {"answer": answer}
    except Exception as e:
        print("❌ Error during query_index:", str(e))
        return {"answer": "An error occurred while processing the question."}