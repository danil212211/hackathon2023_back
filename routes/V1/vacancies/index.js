const { Router } = require("express");
const router = Router();
const { Post, User, Vacancy } = require("../../../database");

router.post("/", async function (request, response) {
  const newVacancy = await Vacancy.create({
    userLogin: request.body.login,
    name: request.body.name,
    description: request.body.description,
    requirements: request.body.requirements,
    contactNumber: request.body.contactNumber,
    contactEmail: request.body.contactEmail,
  });
  response.status(200).json(newVacancy.id);
});
router.get("/", async function (request, response) {
  const vacancies = await Vacancy.findAll({
    order: [["createdAt", "DESC"]],
  });
  return response.status(200).json(JSON.parse(JSON.stringify(vacancies)));
});
module.exports = {
  router,
};
