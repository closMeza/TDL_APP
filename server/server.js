require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');



const app = express();
const PORT = 3000;

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   });
  
// app.use(limiter);

// Replace '*' with my React Native app's domain when deploying
app.use(cors());

// Replace with my OpenAI API key
const OPENAI_API_KEY = 'MY_OPENAI_API_KEY';

app.get('/generatePrompt', async (req, res) => {
    try {
        const response = await fetch.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: req.query.prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].text.trim());
    } catch (error) {
        res.status(500).send('Error generating prompt');
    }
});

app.get('/test', (req, res) => {
    console.log('pinged')
    res.json({ message: 'Elisa is my world!' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
