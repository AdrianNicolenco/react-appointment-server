module.exports = (app) => {
    const router = require("express").Router();
    
    const auth = require("../middleware/auth");

    const appointment = require("../controllers/appointment");
    
    router.post("/", auth, appointment.create);

    router.put("/", auth, appointment.update);

    router.delete("/:id", auth, appointment.delete);
    
    router.post("/:id", appointment.change);

    router.put("/:id", appointment.remove);

    router.get("/all", appointment.getAll);

    app.use('/appointment', router)
}