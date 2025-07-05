"""CLI for querying the portfolio RAG index using OpenRouter."""

from __future__ import annotations

import argparse
import os
from pathlib import Path
from typing import List

import openrouter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma


VECTOR_DIR = Path("vectorstore")


def load_api_key() -> str | None:
    """Load API key from environment or .env file."""
    key = os.getenv("OPENROUTER_API_KEY")
    if key:
        return key

    env_path = Path(".env")
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                if line.startswith("OPENROUTER_API_KEY"):
                    _, val = line.strip().split("=", 1)
                    return val
    return None


def load_vectorstore() -> Chroma:
    """Load the persisted Chroma vector store."""
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return Chroma(persist_directory=str(VECTOR_DIR), embedding_function=embeddings)


def query_index(question: str, top_k: int = 3) -> str:
    """Retrieve similar chunks and ask Mistral 7B via OpenRouter."""
    store = load_vectorstore()
    docs = store.similarity_search(question, k=top_k)
    context = "\n\n".join(d.page_content for d in docs)

    api_key = load_api_key()
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY not provided")

    client = openrouter.Client(api_key=api_key)
    messages = [
        {
            "role": "system",
            "content": "You are Ayush Patel's portfolio assistant. Use the provided context to answer questions.",
        },
        {
            "role": "user",
            "content": f"Context:\n{context}\n\nQuestion: {question}",
        },
    ]
    resp = client.chat.completions.create(model="mistralai/mistral-7b-instruct", messages=messages)
    return resp.choices[0].message.content


def main() -> None:
    parser = argparse.ArgumentParser(description="Query the portfolio RAG index")
    parser.add_argument("question", nargs="?", help="User question")
    parser.add_argument("--top_k", type=int, default=3, help="Number of chunks to retrieve")
    args = parser.parse_args()

    if not args.question:
        example_questions = [
            "What is Ayush's experience with NLP?",
            "Describe Ayush's forecasting project.",
            "List Ayush's core skills.",
        ]
        print("Example questions:")
        for q in example_questions:
            print(f" - {q}")
        return

    answer = query_index(args.question, top_k=args.top_k)
    print(answer)


if __name__ == "__main__":
    main()

