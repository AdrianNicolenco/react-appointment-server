const db = require("../models");
const Business = db.business;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, location, password } = req.query;
  if (!(email && password && name && location)) {
    res.status(400).send("All input is required");
  }
  const oldBusiness = await Business.findOne({
    email,
  });

  if (oldBusiness) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  bcrypt.genSalt().then((value) => {
    bcrypt.hash(password, value, (err, result) => {
      Business.create({
        name: name,
        email: email,
        location: location,
        password: result,
      })
        .then((data) => {
          const token = jwt.sign(
            { user_id: data.id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "15m",
            }
          );
          data.token = token;
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial",
          });
        });
    });
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const business = await Business.findOne({ email });

    if (business && (await bcrypt.compare(password, business.password))) {
      const token = jwt.sign(
        { user_id: business.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15m",
        }
      );
      business.token = token;
      res.status(200).json(business);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
