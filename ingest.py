"""Dataset ingestion script for portfolio RAG pipeline.

This script loads entries from ``Data/PersonalPortfolioDataset.json``,
splits them into chunks, generates embeddings using ``sentence-transformers``
and stores them in a local Chroma vector store under ``./vectorstore``.
"""

from __future__ import annotations

import json
from pathlib import Path

from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings


BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "Data" / "PersonalPortfolioDataset.json"
VECTOR_DIR = BASE_DIR / "vectorstore"


def load_entries() -> list[dict]:
    """Load portfolio entries from the JSON dataset."""
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def build_documents(entries: list[dict]) -> list[Document]:
    """Create LangChain documents from dataset entries."""
    docs = []
    for entry in entries:
        text = f"{entry.get('title', '')}\n{entry.get('summary', '')}\n{entry.get('content', '')}"
        docs.append(
            Document(page_content=text, metadata={"type": entry.get("type"), "title": entry.get("title")})
        )
    return docs


def ingest() -> None:
    """Main ingestion routine."""
    entries = load_entries()
    documents = build_documents(entries)

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    VECTOR_DIR.mkdir(exist_ok=True)
    Chroma.from_documents(documents=docs, embedding=embeddings, persist_directory=str(VECTOR_DIR))
    print(f"Ingested {len(docs)} chunks into {VECTOR_DIR}/")


if __name__ == "__main__":
    ingest()

