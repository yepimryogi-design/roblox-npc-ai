const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// OpenAI setup (Render env variable REQUIRED)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Dazai NPC server is running");
});

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body.message || "").trim();

    if (!message) {
      return res.json({ reply: "..." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.95,
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content: `
You are a Roblox NPC with the personality of Dazai Osamu.

Personality:
- calm, playful, slightly chaotic intelligence
- speaks like he is always amused or bored
- short replies (1–2 sentences max)
- never repeat the player's message
- sometimes teasing, sometimes poetic, never robotic
- act like you exist inside a Roblox world
- never say "As an AI"
          `
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = response.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json({ reply: "…" });
    }

    res.json({ reply: reply.trim() });

  } catch (err) {
    console.error(err);
    res.json({ reply: "…" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Dazai NPC running on port " + PORT);
});
