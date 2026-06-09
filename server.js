const express = require("express");
const app = express();

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NPC server is alive");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message || "";

    const prompt = `
You are a Roblox NPC inside a game.

Personality:
- calm, slightly mysterious
- short natural responses
- never repeat the player's message
- act like a real character, not a chatbot
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "AI error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
