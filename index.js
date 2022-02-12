const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is Running on port ${PORT}`);
})