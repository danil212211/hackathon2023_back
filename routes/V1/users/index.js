const { Router } = require("express");
const router = Router();
const { User } = require("../../../database");

router.get("/", async function (request, response) {
  console.log(request.query, request.params, request.body);
  let user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      login: request.query.login,
    },
    raw: true,
  });
  return response.status(200).json(user);
});
router.post("/signin", async function (request, response) {
  const user = await User.findOne({
    where: {
      login: request.body.login,
    },
  });
  if (user.password === request.body.password) {
    return response.sendStatus(200);
  }
  return response.sendStatus(401);
});
router.post("/signup", async function (request, response) {
  const [user] = await User.findOrCreate({
    where: {
      login: request.body.login,
    },
  });
  user.firstName = request.body.firstName;
  user.lastName = request.body.lastName;
  user.password = request.body.password;
  user.email = request.body.email;
  user.avatar = request.body.avatar;
  await user.save();
  response.sendStatus(200);
});

module.exports = {
  router,
};
