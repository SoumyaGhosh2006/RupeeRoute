# MoneyMind (RupeeRoute)

Metallic glass finance dashboard with:
- Money Health Score (0-100)
- Income vs Savings target analysis
- AI chat coach via secure backend proxy

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in project root from `.env.example`:

```bash
cp .env.example .env
```

3. Add your OpenAI key in `.env`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
PORT=8787
```

## Run

Run client + server together:

```bash
npm run dev
```

- Vite client runs on default Vite port.
- Express server runs on `http://localhost:8787`.
- Frontend calls `/api/chat` through Vite proxy.

## API

`POST /api/chat`

Request body:

```json
{
  "message": "How can I improve savings?",
  "context": {
    "income": 50000,
    "targetSavingsPercent": 20,
    "rent": 15000,
    "food": 7000,
    "travel": 3000,
    "totalExpense": 25000,
    "actualSavings": 25000,
    "actualSavingsRate": 50,
    "targetSavingsAmount": 10000,
    "targetGap": 15000,
    "meetsTarget": true,
    "score": 88,
    "band": "Excellent",
    "highestSpending": "rent"
  }
}
```

Response body:

```json
{
  "reply": "..."
}
```
