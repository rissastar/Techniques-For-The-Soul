const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

app.post('/chat', async (req, res) => {
  try {
    const { messages, model = 'gpt-4' } = req.body;
    const response = await openai.createChatCompletion({
      model,
      messages,
      temperature: 0.7
    });
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Proxy listening on port 3000'));