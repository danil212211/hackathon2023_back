function dontCrash(request, response, next) {
  try {
    next();
  } catch (e) {
    console.log(e);
    return response.sendStatus(502);
  }
}
module.exports = {
  dontCrash,
};
