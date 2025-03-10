module.exports = {
  secret: process.env.JWT_SECRET || "your_jwt_secret",
  accessTokenLife: "15m",
  refreshTokenLife: "7d",
};
