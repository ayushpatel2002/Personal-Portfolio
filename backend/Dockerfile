# Use lightweight Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy all backend files into the container
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose FastAPI port
EXPOSE 8080

# Run the API
CMD ["uvicorn", "ask:app", "--host", "0.0.0.0", "--port", "8080"]