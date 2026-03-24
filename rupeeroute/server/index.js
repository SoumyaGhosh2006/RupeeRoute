/* global process */
import cors from "cors";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT) || 8787;

app.use(cors());
app.use(express.json());

const REQUIRED_NUMERIC_FIELDS = [
  "income",
  "targetSavingsPercent",
  "rent",
  "food",
  "travel",
  "totalExpense",
  "actualSavings",
  "actualSavingsRate",
  "targetSavingsAmount",
  "targetGap",
  "score",
];

function validatePayload(body) {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }

  const { message, context } = body;
  if (typeof message !== "string" || !message.trim()) {
    return "Message is required.";
  }

  if (!context || typeof context !== "object") {
    return "Context is required.";
  }

  for (const field of REQUIRED_NUMERIC_FIELDS) {
    if (!Number.isFinite(Number(context[field]))) {
      return `Context field '${field}' must be a number.`;
    }
  }

  if (typeof context.meetsTarget !== "boolean") {
    return "Context field 'meetsTarget' must be a boolean.";
  }

  if (typeof context.band !== "string" || !context.band.trim()) {
    return "Context field 'band' must be a string.";
  }

  if (typeof context.highestSpending !== "string" || !context.highestSpending.trim()) {
    return "Context field 'highestSpending' must be a string.";
  }

  return null;
}

function buildUserPrompt(message, context) {
  return [
    "User financial context:",
    `- Income: Rs ${context.income}`,
    `- Total Expense: Rs ${context.totalExpense}`,
    `- Savings: Rs ${context.actualSavings} (${context.actualSavingsRate}%)`,
    `- Target Savings %: ${context.targetSavingsPercent}%`,
    `- Target Savings Amount: Rs ${context.targetSavingsAmount}`,
    `- Target Gap: Rs ${context.targetGap}`,
    `- Target Status: ${context.meetsTarget ? "On Track" : "Behind"}`,
    `- Money Health Score: ${context.score} (${context.band})`,
    `- Highest Spending Category: ${context.highestSpending}`,
    `- Category Spend: Rent Rs ${context.rent}, Food Rs ${context.food}, Travel Rs ${context.travel}`,
    "",
    `User question: ${message}`,
  ].join("\n");
}

app.post("/api/chat", async (req, res) => {
  const validationError = validatePayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { message, context } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.json({
      reply:
        "AI service is not configured yet. Add OPENAI_API_KEY in your server .env file to enable coaching replies.",
    });
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  try {
    const completion = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content:
            "You are a concise personal finance coach. Give practical, non-judgmental tips based on user metrics. Mention this is educational guidance only and not professional financial advice.",
        },
        {
          role: "user",
          content: buildUserPrompt(message, context),
        },
      ],
      max_output_tokens: 260,
    });

    const reply = completion.output_text?.trim();
    return res.json({
      reply:
        reply ||
        "I could not generate a response right now. Try rephrasing your question in one sentence.",
    });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return res.json({
      reply:
        "I could not reach the AI service right now. Please try again in a moment. This guidance is educational, not professional financial advice.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`MoneyMind AI server listening on port ${port}`);
});
