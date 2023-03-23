const { userAuthController } = require("../controllers/users/auth");
const { userAccountController } = require("../controllers/users/account");
module.exports = async (socket, next) => {
  try {
    const userCookie = socket?.request?.cookies?.user;
    let userAuth = new userAuthController();
    if (userCookie.login && userCookie.SSID) {
      userAuth.setLogin(userCookie?.login);
      const successVerify = await userAuth.isSessionVerified(userCookie?.SSID);
      console.log(successVerify);
      if (successVerify) {
        socket.join(`user:${userAuth.getLogin()}`);
      }
    }
  } catch (e) {}
  next();
};
