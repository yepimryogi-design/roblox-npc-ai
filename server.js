const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NPC server is alive");
});

app.post("/chat", (req, res) => {
  const message = req.body.message || "";

  res.json({
    reply: "You said: " + message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
