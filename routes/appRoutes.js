const express = require("express");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router();

const controller = require("../controllers/appController");

router.get("/", verifyUser, controller.home);
router.get("/category/:id", verifyUser, controller.category);
router.get("/category/:categoryId/estate/:id/", verifyUser, controller.showEstateGeneral);
router.post("/search", verifyUser, controller.search)
router.get("/404", verifyUser, controller.notFound)



module.exports = router;