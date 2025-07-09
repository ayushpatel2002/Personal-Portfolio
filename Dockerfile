FROM python:3.11-slim

WORKDIR /app

# Install dependencies first (cache efficient)
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Then copy the rest
COPY backend/ ./backend/

EXPOSE 8080

CMD ["uvicorn", "backend.ask:app", "--host", "0.0.0.0", "--port", "8080"]