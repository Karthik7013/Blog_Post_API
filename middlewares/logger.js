function logger(req, res, next) {
  console.log(`[${req.method}] http://${req.headers['host']}${req.url} [ ${new Date()} ]`)
  next();
}

export default logger;
