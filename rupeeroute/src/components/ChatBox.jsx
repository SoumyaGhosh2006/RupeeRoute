import { useMemo, useState } from "react";

const PROMPT_HINTS = [
  "How can I reduce food expenses?",
  "Suggest a better savings target for me.",
  "What should I cut first if I am behind target?",
];

export default function ChatBox({ context, disabled }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I am your MoneyMind assistant. Add your numbers and ask anything about improving your finances.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hints = useMemo(() => PROMPT_HINTS, []);

  const sendMessage = async (question) => {
    const message = question.trim();
    if (!message || loading || disabled) return;

    setError("");
    setPrompt("");
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to get a reply right now.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: payload.reply || "No response received." },
      ]);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong while contacting AI.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(prompt);
  };

  return (
    <section className="glass card chat-card">
      <h4>AI Coach</h4>
      <p className="muted">
        Smart suggestions based on your current income, expenses, and savings target.
      </p>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`chat-msg ${message.role === "assistant" ? "assistant" : "user"}`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="chat-msg assistant">Analyzing your numbers...</div>}
      </div>

      {error && <p className="chat-error">{error}</p>}

      <div className="chat-hints">
        {hints.map((hint) => (
          <button
            key={hint}
            type="button"
            className="hint-btn"
            onClick={() => sendMessage(hint)}
            disabled={loading || disabled}
          >
            {hint}
          </button>
        ))}
      </div>

      <form className="chat-input" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={disabled ? "Add financial data first" : "Ask your AI coach..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading || disabled}
        />
        <button type="submit" disabled={loading || disabled || !prompt.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
