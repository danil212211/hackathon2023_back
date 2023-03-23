const { Router } = require("express");
const router = Router();
const { Post, User, InterestClub } = require("../../../database");

router.post("/", async function (request, response) {
  const newPost = await Post.create({
    clubId: request.body.clubId,
    userLogin: request.body.login,
    text: request.body.text,
  });
  response.status(200).json(newPost.id);
});
router.get("/", async function (request, response) {
  const clubs = await InterestClub.findAll({
    include: [
      {
        model: User,
        required: true,
        where: {
          login: request.query.login,
        },
      },
    ],
  });
  let postsOutput = [];
  for (let club of clubs) {
    let posts = await Post.findAll({
      where: {
        clubId: club.id,
      },
    });
    postsOutput = postsOutput.concat(JSON.parse(JSON.stringify(posts)));
  }
  console.log("hmm",postsOutput);
  return response.status(200).json(postsOutput);
});
router.get("/club", async function (request, response) {
  let posts = await Post.findAll({
    where: {
      clubId: request.query.clubId,
    },
  });
  return response.status(200).json(JSON.parse(JSON.stringify(posts)));
});
module.exports = {
  router,
};
