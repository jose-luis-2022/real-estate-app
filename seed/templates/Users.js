const bcrypt = require("bcrypt");

const users = [
    {
        fullname:"Jose",
        email:"jose@gmail.com",
        phone: "31564872021",
        img:"",
        img_url: "",
        confirm: 1,
        password: bcrypt.hashSync("password", 10)
    },
    {
        fullname:"Juan",
        email:"juan@gmail.com",
        phone: "31478963054",
        img:"",
        img_url: "",
        confirm: 1,
        password: bcrypt.hashSync("password", 10)
    }
];

module.exports = users;