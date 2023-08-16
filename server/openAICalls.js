const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = process.env.PROMPT;
const openai = new OpenAIApi(configuration);

async function getToDoList(message)
{
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": prompt},
          {"role": "user", "content": message}
        ],
        temperature: 0,
        max_tokens: 1024,
      });

      console.log(response)
}


module.exports = {
    getToDoList: getToDoList
};