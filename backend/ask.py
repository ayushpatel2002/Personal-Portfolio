from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from query import query_index
  # this is your RAG logic

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://personal-portfolio-ten-teal.vercel.app"
    ],
    allow_credentials=True,
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
        response = query_index(question)
        print("🟢 Response from query_index:", response)
        return {"answer": response}
    except Exception as e:
        print("❌ Error in /ask:", e)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)},
        )