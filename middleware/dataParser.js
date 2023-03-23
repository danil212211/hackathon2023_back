function dataParserMiddleware(request, response, next) {
  try {
    request = Object.assign(request, {
      data: {
        ...request.body,
        ...request.query,
        ...request.fields,
      },
    });
    next();
  } catch {
    return request.sendStatus(502);
  }
}
module.exports = {
  dataParserMiddleware,
};
