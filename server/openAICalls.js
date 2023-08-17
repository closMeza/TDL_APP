require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

async function getToDoList(message) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = process.env.SYS_PROMPT;
  const openai = new OpenAIApi(configuration);
  try {
    console.time("API Call Duration");
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
      temperature: 0,
      max_tokens: 1024,
    });
    console.timeEnd("API Call Duration");
    console.log("test");
    var data = completion.data.choices;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getToDoList: getToDoList,
};
