const { Router } = require("express");
const router = Router();
const { InterestClub, User } = require("../../../database");

router.get("/get/:index", async function (request, response) {
  let club = await InterestClub.findOne({
    where: {
      id: request.params.index,
    },
    include: [
      {
        model: User,
        required: false,
        where: {
          login: request?.query?.login || "",
        },
      },
    ],
  });
  let clubJson = JSON.parse(JSON.stringify(club));
  clubJson.userCount = await club.countUsers();
  response.status(200).json(clubJson);
});
router.get("/", async function (request, response) {
  let clubs = await InterestClub.findAll();
  let clubArray = JSON.parse(JSON.stringify(clubs));
  for (let i = 0; i < clubs.length; ++i) {
    clubArray[i].userCount = await clubs[i].countUsers();
  }
  return response.status(200).json(clubArray);
});
router.get("/top", async function (request, response) {
  let clubs = await InterestClub.findAll({});
  let clubArray = JSON.parse(JSON.stringify(clubs));
  for (let i = 0; i < clubs.length; ++i) {
    clubArray[i].userCount = await clubs[i].countUsers();
  }
  clubArray.sort(function (first, second) {
    return second.userCount - first.userCount;
  });
  return response.status(200).json(clubArray.slice(0, 2));
});
router.get("/new", async function (request, response) {
  let clubs = await InterestClub.findAll({
    order: [["createdAt", "DESC"]],
  });
  return response
    .status(200)
    .json(JSON.parse(JSON.stringify(clubs.slice(0, 2))));
});
module.exports = {
  router,
};
