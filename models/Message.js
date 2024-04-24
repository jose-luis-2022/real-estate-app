const DataTypes = require("sequelize");
const database = require("../config/db");

const Message= database.define("messages", {
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estateId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Message;