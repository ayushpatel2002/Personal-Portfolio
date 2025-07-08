# Personal Portfolio RAG

This repository includes a lightweight retrieval-augmented generation (RAG) pipeline built with [LangChain](https://github.com/langchain-ai/langchain) and [OpenRouter](https://openrouter.ai/).

## Setup
1. Create and activate a virtual environment (optional):
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies from `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
3. Obtain an OpenRouter API key and place it in a `.env` file or export `OPENROUTER_API_KEY` in your environment:
   ```bash
   echo "OPENROUTER_API_KEY=sk-..." > .env
   ```
4. (Optional) specify the backend URL used by the React app:
   ```bash
   echo "VITE_BACKEND_URL=http://localhost:8080" >> .env
   ```

## Ingestion
Run the ingestion script to build the local vector store:
```bash
python ingest.py
```
This reads `backend/Data/PersonalPortfolioDataset.json`, splits it into chunks, generates embeddings using `sentence-transformers/all-MiniLM-L6-v2`, and stores them in `backend/vectorstore/`.

## Querying
After ingestion, ask questions using the CLI:
```bash
python query.py "What is Ayush's experience with NLP?"
```
If no question is supplied, example questions are printed.

The script retrieves the most relevant chunks from the vector store and sends them to OpenRouter's Mistral 7B model to generate an answer.

