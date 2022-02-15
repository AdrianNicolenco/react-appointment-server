const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  console.log(req.headers)
  // If there is any token, throw 403 error
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
  // Verify Token & get information
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userInfo = decoded;
  }
  // If the token is Invalid, throw 401 error
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
  
  return next();
};

module.exports = verifyToken;