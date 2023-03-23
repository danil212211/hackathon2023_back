const { userAuthController } = require("../controllers/users/auth");
const { userAccountController } = require("../controllers/users/account");
async function useUserSessionMiddleware(request, response, next) {
  request.activeUser = new userAccountController();
  try {
    const userCookie = JSON.parse(request?.cookies?.user);
    let userAuth = new userAuthController();

    userAuth.setLogin(userCookie?.login);
    const successVerify = await userAuth.isSessionVerified(userCookie?.SSID);
    if (successVerify) {
      request.activeUser = await request.activeUser.setUserByLogin(
        userAuth.getLogin()
      );
      request.activeUser.setSessionVerified();
      return next();
    }
  } catch (e) {}
  next();
}
module.exports = {
  useUserSessionMiddleware,
};
