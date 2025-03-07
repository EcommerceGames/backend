const jwt = require("jsonwebtoken");
//check Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({
          status: "ERR",
          message: "Token is not valid!",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      status: "ERR",
      message: "You're not authenticated",
    });
  }
};

//check id and Admin
const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

//justAdmin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};
