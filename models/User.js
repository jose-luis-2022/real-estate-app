const DataTypes = require("sequelize");
const database = require("../config/db");
const bcrypt = require("bcrypt");

const User = database.define(
  "Users",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    scopes: {
      deleteData: {
        attributes: {
          exclude: ["password", "token", "confirm", "createdAt", "updatedAt"]
        }
      }
    }
  }
);

User.prototype.checkPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;
