export const globaErrhandler = (err, req, res, next) => {
  const stack = err?.stack;
  const message = err?.message;
  const statusCode = 500
  res.json({
    stack,
    message,
  });
};
