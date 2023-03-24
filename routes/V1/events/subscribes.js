const { Router } = require("express");
const router = Router();
const { Event, EventParticipant, User } = require("../../../database");

router.get("/:login", async function (request, response) {
  const events = await Event.findAll({
    include: [
      {
        required: true,
        as: "subs",
        model: User,
        where: {
          login: request.params.login,
        },
      },
    ],
    order: [["createdAt","DESC"]],
  });
  const eventsJSON = JSON.parse(JSON.stringify(events));
  for (let i = 0; i < events.length; ++i) {
    eventsJSON[i].userCount = await events[i].countSubs();
  }
  response.status(200).json(eventsJSON);
});
router.post("/", async function (request, response) {
  await EventParticipant.findOrCreate({
    where: {
      eventId: request.body.eventId,
      userLogin: request.body.login,
    },
  });
  return response.status(200).json({});
});
router.delete("/", async function (request, response) {
  await EventParticipant.destroy({
    where: {
      eventId: request.body.eventId,
      userLogin: request.body.login,
    },
  });
  return response.status(200).json({});
});

module.exports = {
  router,
};
