const getAuthToken = (req) => {
  const token = req.headers["x-auth-token"] || null;
  return token;
};
export default getAuthToken;