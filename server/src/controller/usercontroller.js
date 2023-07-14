const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const data = req.body;
        console.log("this is body", data);
        const { name, email, password } = data;

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



const login = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "data is required" });
        }

        if (!email)
            return res.status(400).send({ status: false, msg: "email is required" });

        const finduser = await usermodel.findOne({ email: email });
        console.log("this is the user", finduser);

        if (!finduser) {
            return res
                .status(401)
                .send({ status: false, msg: "wrong email invalid crdetial" });
        }
        if (!password) {
            return res
                .status(400)
                .send({ status: false, msg: "password is required" });
        }

        let payload = {
            userId: finduser._id.toString(),
        };

        let token = jwt.sign({ payload }, "secretkey", { expiresIn: "24h" });

        let decode = jwt.decode(token, "secretkey");
        return res
            .status(200)
            .send({
                status: true,
                msg: "login successfully",
                data: { token: token, userId: decode.userId },
            });
        // res.status(200).send({status:true,msg:"success"})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.msg });
    }
};

module.exports = { login, register };
