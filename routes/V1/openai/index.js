const { Router } = require("express");
const router = Router();
const axios = require("axios");
const config = require("../../../config");
const { User } = require("../../../database");

const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");
const download = require("download");

async function saveImageFromURL(fileURL) {
  const time = new Date().getTime();
  const fileUri = `${config.storage}/${time}.jpg`;
  fs.writeFileSync(fileUri, await download(fileURL));
  return `/api/public/${time}.jpg`;
}
const configuration = new Configuration({
  apiKey: "apiCLUCH NE VORUY",
});
const openai = new OpenAIApi(configuration);

async function translate({ text, target, source }) {
  return text;
}
router.get("/chat", async function (request, response) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: request.query.text,
      },
    ],
  });
  response.status(200).json(completion.data.choices[0].message.content);
});
router.get("/image", async function (request, response) {
  const translatedText = await translate({
    text: request.query.text,
    source: "ru",
    target: "en",
  });
  const image = await openai.createImage({
    prompt: translatedText,
    size: "512x512",
  });
  const ret = await saveImageFromURL(image.data.data[0].url);
  response.status(200).json(ret);
});
module.exports = {
  router,
};
