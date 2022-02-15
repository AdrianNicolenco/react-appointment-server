module.exports = (app) => {
    const router = require("express").Router();
    
    const auth = require("../middleware/auth");

    const appointment = require("../controllers/appointment");
    
    router.post("/", auth, appointment.create);

    router.put("/", auth, appointment.update);

    router.delete("/:id", auth, appointment.delete);
    
    router.post("/:id", auth, appointment.change);

    router.put("/:id", auth, appointment.remove);

    app.use('/appointment', router)
}