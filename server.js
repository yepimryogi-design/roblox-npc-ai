const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// OpenAI setup (REQUIRED env var on Render)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Dazai NPC server is alive");
});

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body.message || "").trim();

    if (!message) {
      return res.json({ reply: "…" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content: `
You are a Roblox NPC with the personality of Dazai Osamu.

Rules:
- calm, playful, slightly mysterious tone
- short replies (1–2 sentences max)
- NEVER repeat the user's message
- NEVER output empty text
- NEVER respond with "..."
- act like you are inside a Roblox world
- sometimes teasing, sometimes poetic, always natural
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    let reply = completion?.choices?.[0]?.message?.content;

    // HARD SAFETY: prevents "..." problem permanently
    if (!reply || reply.trim().length === 0) {
      reply = "…";
    }

    res.json({ reply: reply.trim() });

  } catch (err) {
    console.error("OPENAI ERROR:", err);
catch (err) {
  console.error(err);
  res.json({ reply: "ERROR: check Render logs" });
}
