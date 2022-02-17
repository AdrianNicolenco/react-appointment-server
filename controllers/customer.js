/* ----- Import Database Logic ----- */

const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

/* ----- Import JWT library ----- */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ----- Define SignUp Function ----- */

exports.signup = async (req, res) => {

  const { name, email, location, password } = req.body.object;

  if (!(email && password && name && location)) {
    res.status(400).send("All input is required");
    return;
  }
  
  const oldCustomer = await Customer.findOne({
    where:{email},
  }); // Authorizer already existed
  if (oldCustomer) {
    res.status(400).send("User Already Exist. Please Login");
    return;
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
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customer",
          });
        });
    });
  });
};

/* ----- Define Login Function ----- */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body.object;
    
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const customer = await Customer.findOne({
      where:{email},
    }); // Authorizer already existed

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign(
        { user_id: customer.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({...customer, token: token});
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

/* ----- Define update Function ----- */
exports.findAppointmentById = (Id) => {
  return Customer.findByPk(Id, { include: ["appointment"] })
    .then((appointment) => {
      return appointment;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};

exports.find = async (req, res) => {
  return Customer.findAll().then((customer) => {return customer});
}

exports.findById = async (req, res) => {
  this.findAppointmentById(req.params.id).then((value)=> res.status(200).json(value));
}