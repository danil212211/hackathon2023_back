async function requireUserSessionMiddleware(request, response, next) {
  if (
    !request.activeUser ||
    (request.activeUser && request.activeUser.isSessionVerified() === false)
  ) {
    return response.sendStatus(401);
  }
  next();
}
module.exports = {
  requireUserSessionMiddleware,
};
