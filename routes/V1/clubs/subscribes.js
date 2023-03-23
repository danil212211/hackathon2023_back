const { Router } = require("express");
const router = Router();
const { InterestClub, ClubParticipant, User } = require("../../../database");

router.get("/:login", async function (request, response) {
  const clubs = await InterestClub.findAll({
    include: [
      {
        required: true,
        model: User,
        where: {
          login: request.params.login,
        },
      },
    ],
  });
  response.status(200).json(JSON.parse(JSON.stringify(clubs)));
});
router.post("/", async function (request, response) {
  await ClubParticipant.findOrCreate({
    where: {
      clubId: request.body.clubId,
      userLogin: request.body.login,
    },
  });
  return response.status(200).json({});
});
router.delete("/", async function (request, response) {
  await ClubParticipant.destroy({
    where: {
      clubId: request.body.clubId,
      userLogin: request.body.login,
    },
  });
  return response.status(200).json({});
});

module.exports = {
  router,
};
