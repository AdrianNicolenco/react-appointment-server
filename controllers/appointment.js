/* ----- Import Database Logic ----- */

const db = require("../models");
const Appointment = db.appointment;
const Op = db.Sequelize.Op;

/* ----- Import JWT library ----- */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ----- Define find Function ----- */


/* ----- Define create Function ----- */

exports.create = async (req, res) => {
    const { title, starttime, endtime, customerId, businessId, location } = req.body.object;
    if (!(title && starttime && endtime && customerId && businessId)) {
    	res.status(400).send("All input is required");
        return;
  	}
        Appointment.create({
        title:title,
        starttime:starttime,
        endtime:endtime,
        location:location,
        customerId:customerId,
        businessId:businessId,
    }).then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the appointment"
        })
    })   
}
    
/* ----- Define update Function ----- */

exports.update = async (req, res) => {
    console.log(req);
    const {id, title, starttime, endtime, location} = req.body.object;
    const oldAppointment = await Appointment.findOne({ where: { id } });
    if(oldAppointment === null) {
        res.status(400).json({
            status: false,
            errorMessage: 'Appointment Not Exist!'
        })
    } else {
        const resultAppointment = await Appointment.update({
            title: title,
            starttime: starttime,
            endtime: endtime,
            location:location,
            status:0,
            isRead:0
        }, {
           where: {
               id
           }
       });
       if(resultAppointment === null) {
            res.status(400).json({
                status: false,
                errorMessage: 'Update failed'
            })
        } else {
            res.status(200).json({
                status: true,
                response: resultAppointment
            })
        }
    }
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const oldAppointment = await Appointment.findOne({ where: { id } });
    if(oldAppointment === null) {
        res.status(400).json({
            status: false,
            errorMessage: 'Appointment Not Exist!'
        })
    } else {
        const resultAppointment = await Appointment.update({
            status:-1,
            isRead:0
        }, {
           where: {
               id
           }
       });
       if(resultAppointment === null) {
            res.status(400).json({
                status: false,
                errorMessage: 'Update failed'
            })
        } else {
            res.status(200).json({
                status: true,
                response: resultAppointment
            })
        }
    }
}

exports.change = async (req, res) => {
    console.log(req.params.id);
    const {id} = req.params;
    const oldAppointment = await Appointment.findOne({ where: { id } });
    if(oldAppointment === null) {
        res.status(400).json({
            status: false,
            errorMessage: 'Appointment Not Exist!'
        })
    } else {
        const resultAppointment = await Appointment.update({
            status: 1
        }, {
           where: {
               id
           }
       });
       if(resultAppointment === null) {
            res.status(400).json({
                status: false,
                errorMessage: 'Update failed'
            })
        } else {
            res.status(200).json({
                status: true,
                response: resultAppointment
            })
        }
    }
}


exports.remove = async (req, res) => {
    try{
        const {id} = req.params;
    const oldAppointment = await Appointment.findOne({ where: { id } });
    if(oldAppointment === null) {
        res.status(400).json({
            status: false,
            errorMessage: 'Appointment Not Exist!'
        })
    } else {
        await oldAppointment.destroy();
        res.status(200).json({
            status: false,
            errorMessage: 'Delete Successfully'
        })
    } }catch(e) {
        res.status(400).json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

exports.getAll = async(req, res) => {
    Appointment.findAll().then((business) => {res.status(200).json(business)});
}