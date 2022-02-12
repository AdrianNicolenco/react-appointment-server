module.exports = (app) => {
    const router = require("express").Router();
    
    const customer = require("../controllers/customer.js");

    router.post("/signup", customer.signup);
    
    router.post("/login", customer.login);
    
    app.use('/customer', router)
}