const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password} = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "data is required" });
    }
    if (!name) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!email) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }

    const duplicateEmail = await usermodel.findOne({ email: email });
    if (duplicateEmail) {
      return res
        .status(409)
        .send({ status: false, msg: "email is allready present" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }

    const create = await usermodel.create(data);
    return res
      .status(200)
      .send({ status: true, msg: "data created successfully", data: create });
  } catch (error) {
    return res.status(500).send({ status: false, msg: "data is required" });
  }
};

const login = async function (req, res) {
  try {
    let { email, password,token} = req.body;

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email sholud be present!" });

    const exist = await usermodel.findOne({ email: email });
    if (!exist) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid creditinal for email" });
    }

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password sholud be present!" });

    let tokens = jwt.sign({ userId: exist._id.toString() },"secretkey",{
      expiresIn: "24hr",
    });

    // let decode = jwt.decode(token,"secretkey");

    res.setHeader("x-api-key", tokens);

    return res
      .status(200)
      .send({
        status: true,
        message: "Successfully Login",
        // data: token,
        // userId: decode.userId,
        tokens:tokens
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { register, login };
