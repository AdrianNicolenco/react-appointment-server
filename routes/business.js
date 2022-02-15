module.exports = (app) => {
    const router = require("express").Router();
    
    const business = require("../controllers/business");
    
    const auth = require("../middleware/auth");

    router.post("/signup",  business.signup);
    
    router.post("/login", business.login);
    
    router.get("/", auth, business.find);

    router.get("/:id", auth, business.findById);

    app.use('/business', router)
}