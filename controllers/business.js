/* ----- Import Database Logic ----- */

const db = require("../models");
const Business = db.business;
const Op = db.Sequelize.Op;

/* ----- Import JWT library ----- */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ----- Define SignUp Function ----- */

exports.signup = async (req, res) => {

  const { name, email, location, password } = req.body.object;

  if (!(email && password && name && location)) {
    res.status(400).send("All input is required");
  }

  const oldBusiness = await Business.findOne({
    where:{email},
  }); // Authorizer already existed

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
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the business",
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

    const business = await Business.findOne({
      where:{email},
    }); // Authorizer already existed

    if (business && (await bcrypt.compare(password, business.password))) {
      const token = jwt.sign(
        { user_id: business.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      business.token = token;
      res.status(200).json({...business, token: token});
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

/* ----- Define Login Function ----- */
exports.findAppointmentById = (appointmentId) => {
  return Business.findByPk(appointmentId, { include: ["appointment"] })
    .then((appointment) => {
      return appointment;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};

exports.find = async (req, res) => {
  Business.findAll().then((business) => {res.status(200).json(business)});
}

exports.findById = async (req, res) => {
  this.findAppointmentById(req.params.id).then((value)=> res.status(200).json(value));
}