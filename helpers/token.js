const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = data => jwt.sign({id: data.id, fullname: data.fullname}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h"
})

module.exports = generateToken;