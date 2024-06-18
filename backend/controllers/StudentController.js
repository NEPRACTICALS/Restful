


const jwt = require("jsonwebtoken");
const password_complexity = require("joi-password-complexity");
const bcryptjs = require("bcryptjs");
const Student = require("../models/Student");
const { validate } = require("../utils/StudentValidation");

exports.createUser = async (req, res) => {
  console.log("called")
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName ,email, password } = req.body;

  

  try {
    let user = await Student.findOne({ where: { email } });
    if (user) {
      console.log("user already exists")
      return res
        .status(400)
        .send(`The user with email ${email} already exists`);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log("finished hashing password")
    user = await Student.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    console.log("Before token");
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h"
    });
    console.log(token);

    console.log("about to send response")
    res.status(201).send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("Incorrect email or password");
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).send("Incorrect email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h"
    });

     res
       .status(200)
       .header("Authorization", `Bearer ${token}`)
       .json({
         success: true,
         token: `Bearer ${token}`,
         user
       });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while logging in the user");
  }
};
