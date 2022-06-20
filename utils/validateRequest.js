const jwt = require("jsonwebtoken");
const authSecret = String(process.env.AUTH_SECRET_KEY);

function validateRequest(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, authSecret, (err, user) => {

    if ( err ) return res.sendStatus(403);

    next();
  });
}

module.exports = validateRequest;
