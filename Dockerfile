# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/ ./backend/
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8080

ENV PYTHONPATH=/app

# Run FastAPI with Uvicorn
CMD ["uvicorn", "backend.ask:app", "--host", "0.0.0.0", "--port", "8080"]