FROM python:3.11-slim

WORKDIR /app

# Copy and install dependencies first
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend code
COPY backend/ ./backend/

# Optional: expose port (for local reference only)
EXPOSE 8080

# CMD to run the FastAPI app
CMD ["uvicorn", "backend.ask:app", "--host", "0.0.0.0", "--port", "8080"]