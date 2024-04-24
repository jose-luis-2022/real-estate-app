const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const routesProtected = async(req, res, next) => {
    const { _token } = req.cookies;

    if(!_token){
        return res.redirect("/")
    };

    try {
        
        const decoded = jwt.verify(_token, process.env.JWT_TOKEN_SECRET);
        const user = await User.scope("deleteData").findByPk(decoded.id);

        if(user){
            req.user = user;

        } else {
            return res.redirect("/")
        }

        return next();

    } catch (error) {
        return res.clearCookie("_token").redirect("/");
    };
}

module.exports = routesProtected;