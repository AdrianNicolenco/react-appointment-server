const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, location, password } = req.query;
  if (!(email && password && name && location)) {
    res.status(400).send("All input is required");
  }
  const oldCustomer = await Customer.findOne({
    email,
  });

  if (oldCustomer) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  bcrypt.genSalt().then((value) => {
    bcrypt.hash(password, value, (err, result) => {
      Customer.create({
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
    const customer = await Customer.findOne({ email });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign(
        { user_id: customer.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15m",
        }
      );
      customer.token = token;
      res.status(200).json(customer);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
