const { Router } = require("express");
const router = Router();
const { Post, User, Event } = require("../../../database");

router.post("/", async function (request, response) {
  const newEvent = await Event.create({
    userLogin: request.body.login,

    name: request.body.name,
    date: request.body.date,
    description: request.body.description,
    level: request.body.level,
    image: request.body.image,
    place: request.body.place,
  });
  response.status(200).json(newEvent.id);
});

router.get("/", async function (request, response) {
  const events = await Event.findAll({
    include: [
      {
        as: "subs",
        model: User,
        required: false,
        where: {
          login: request.query?.login,
        },
      },
    ],
    order: [["createdAt","DESC"]],
  });
  const eventsJSON = JSON.parse(JSON.stringify(events));
  for (let i = 0; i < events.length; ++i) {
    eventsJSON[i].userCount = await events[i].countSubs();
  }
  return response.status(200).json(eventsJSON);
});
module.exports = {
  router,
};
