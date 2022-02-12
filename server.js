/* ----- Import Module ----- */

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

/* ---- Init Database ----- */

const db = require("./models");

/* ----- Init Server ----- */

const app = express();

/* ----- Use Modules ---- */

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
db.sequelize.sync();

/* ----- User Routes ----- */

require('./routes/customer')(app);
require('./routes/business')(app);
// require('./routes/appointment')(app);

/* ----- Run the Server ----- */

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server is Running on port ${PORT}`);
})