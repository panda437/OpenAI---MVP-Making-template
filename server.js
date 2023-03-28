/*
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const apiKey = process.env['OpenAIAPIkey'];
const endpoint = "https://api.openai.com/v1/chat/completions";
console.log("API Key", apiKey)

app.post("/api/summary", async (req, res) => {
  try {
    const response = await axios.post(
      endpoint,
      {
        model: "gpt-3.5-turbo",
        messages: req.body.messages,
        max_tokens: 700,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data from ChatGPT:", error);
    res.status(500).send("Error fetching data from ChatGPT.");
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
