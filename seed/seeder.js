const User = require("../models/User");
const users = require("./templates/Users");
const database = require("../config/db")

const importData = async() => {
    try {
        await database.authenticate();
        await database.sync();
        await Promise.all([
            User.bulkCreate(users),
        ]);
        console.log("Data imported successful");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const deleteData = async() => {
    try {
        await database.sync({force: true})
        console.log("Data deleted successful")
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-i"){
    importData();
}

if (process.argv[2] === "-d"){
    deleteData();
}