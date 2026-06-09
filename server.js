const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// OpenAI setup (must exist in Render environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check (Render uses this sometimes)
app.get("/", (req, res) => {
  res.send("NPC server is running");
});

// MAIN CHAT ENDPOINT (Roblox uses this)
app.post("/chat", (req, res) => {
  res.json({
    reply: "Server works: " + (req.body.message || "")
  });
});

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content:
            "You are a Roblox NPC. You speak naturally, short replies (1–2 sentences), never repeat the user's message, and stay in character."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json({ reply: "..." });
    }

    res.json({ reply: reply.trim() });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.json({ reply: "AI error occurred." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NPC server running on port " + PORT);
});
