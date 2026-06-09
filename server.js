const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NPC server is alive");
});

app.post("/chat", (req, res) => {
  const message = req.body.message || "";

  res.json({
const prompt = `
You are a Roblox NPC inside a game.

Personality:
- calm, slightly mysterious
- short natural responses
- never repeat the player's message
- act like a real character, not a chatbot

Player said: ${message}
`;

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: prompt },
    { role: "user", content: message }
  ]
});  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
