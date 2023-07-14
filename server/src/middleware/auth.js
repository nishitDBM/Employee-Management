const jwt = require("jsonwebtoken");

const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    console.log(token)
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Token must be present!" });
    }

    jwt.verify(token, "secretkey ", function (err, decodedtoken) {
      if (err) {
        return res
          .status(401)
          .send({ status: false, message:"Token is invalid!" });
      } else {
        req.token = decodedtoken;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {authenticate};
