module.exports = (app) => {
    const router = require("express").Router();
    
    const customer = require("../controllers/customer");

    const auth = require("../middleware/auth");

    router.post("/signup", customer.signup);
    
    router.post("/login", customer.login);

    router.get("/:id", auth, customer.findById);
    
    app.use('/customer', router)
} 