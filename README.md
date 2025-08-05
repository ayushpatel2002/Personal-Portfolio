# Personal Portfolio RAG

An AI-powered assistant that answers questions about my work and background.

## Overview
This project drives the chatbot on [ayushpatelai.com](https://ayushpatelai.com). Visitors can ask about my projects or skills and receive concise, accurate summaries pulled from a curated dataset of my portfolio. It offers an easy way for recruiters and hiring managers to explore my experience without reading every page.

## How Retrieval-Augmented Generation Works
- **Custom chunking** – Portfolio entries are split into code blocks and explanations so the model can reason about implementation details separately from commentary.
- **Vector embeddings** – Each chunk is embedded with `text-embedding-3-small` and stored in a Chroma vector database.
- **LangChain retrieval** – LangChain locates the most relevant chunks to a question.
- **OpenRouter generation** – The retrieved context is fed to a model via OpenRouter to craft a final answer.

## Tech Stack
- Python
- FastAPI
- LangChain
- React
- OpenRouter
- Amazon ECS
- Vercel
- Vector embeddings: `text-embedding-3-small`

## Key Features & Personal Contributions
- Designed custom chunking logic separating code from explanation for higher retrieval accuracy.
- Built a clean FastAPI backend exposing a single `/ask` endpoint.
- Deployed the backend on ECS and the frontend on Vercel.
- Connected the endpoint to my portfolio site's chatbot for live, interactive Q&A.

## Why It Matters
This project showcases my full-stack AI development skills—from data processing and model orchestration to deployment and frontend integration.

