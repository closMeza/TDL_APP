require('dotenv').config();
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const openAI = require('./openAICalls');



const app = express();
const PORT = 3000;

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   });
  
// app.use(limiter);

// Replace '*' with my React Native app's domain when deploying
app.use(cors());
app.use(bodyParser.json());

app.post('/generatePrompt', async (req, res) => {
    try 
    {
        // console.log(req)
        const body = req.body;

        console.log(body);

        res.json({ message: 'Hi from the server' });
    } 
    catch (error) 
    {
        res.status(500).send('Error generating prompt');
    }
});

app.get('/test', (req, res) => {
    res.json({ message: 'Hi from the server' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
