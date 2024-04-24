const express = require("express");
const router = express.Router();

const estatesLoading = require("../controllers/apiController")

router.get("/estates", estatesLoading)

module.exports = router;