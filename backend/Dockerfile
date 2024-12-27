FROM python:3.11-slim

WORKDIR /app

RUN apt update && apt install -y gunicorn

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
