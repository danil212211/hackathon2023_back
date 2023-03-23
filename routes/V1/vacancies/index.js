const { Router } = require("express");
const router = Router();
const { Post, User, Vacancy } = require("../../../database");

router.post("/", async function (request, response) {
    console.log(request.body.requirements);
  /*  const newVacancy = await Vacancy.create({
    clubId: request.body.clubId,
    userLogin: request.body.login,
    text: request.body.text,
  });*/
  response.status(200).json();
});
router.get("/", async function (request, response) {
  const events = await Vacancy.findAll();
  return response.status(200).json(JSON.parse(JSON.stringify(events)));
});
module.exports = {
  router,
};
