const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route doesnt exist");

export default notFoundMiddleware;
