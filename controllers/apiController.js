const Estate = require("../models/Estate");

const estatesLoading = async(req, res) => {

    const estates = await Estate.findAll();

    res.json(estates)

};

module.exports = estatesLoading;