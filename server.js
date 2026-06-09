const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// OpenAI setup (Render env var)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("NPC server online");
});

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body.message || "").trim();

    if (!message) {
      return res.json({ reply: "..." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content: `
You are a Roblox NPC.

Personality:
- calm, intelligent, slightly mysterious
- playful but subtle (Dazai-like energy)
- short responses (1–2 sentences max)
- NEVER repeat the player's message
- NEVER say "You said:"
- act like you are inside a Roblox world
- respond naturally like a real character
          `
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = completion.choices[0].message.content.trim();

    res.json({ reply });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.json({ reply: "…" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NPC server running on port " + PORT);
});
