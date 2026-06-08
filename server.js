import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Roblox NPC. Keep replies short and natural." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  res.json({ reply });
});

app.listen(3000, () => console.log("Server running"));
const express = require("express");
const app = express();

app.use(express.json());

// test route (browser check)
app.get("/", (req, res) => {
  res.send("NPC server is online");
});

// chat route (Roblox will use this)
app.post("/chat", (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.json({ reply: "I didn't receive anything." });
  }

  res.json({
    reply: "You said: " + message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
