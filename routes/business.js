module.exports = (app) => {
    const router = require("express").Router();
    
    const business = require("../controllers/business.js");

    router.post("/signup", business.signup);
    
    router.post("/login", business.login);
    
    app.use('/business', router)
}