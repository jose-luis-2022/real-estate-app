const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD ?? '',{
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 50000,
        idle: 10000
    },
    operatorsAliases: 0
});


module.exports = database;
