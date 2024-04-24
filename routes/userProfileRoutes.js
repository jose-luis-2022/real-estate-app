const express = require("express");
const router = express.Router();
const routesProtected = require("../middlewares/routesProtected");
const uploadImageUser = require("../middlewares/uploadImageUser");
const controller = require("../controllers/userProfileController");

router.get("/", routesProtected, controller.profilePage);
router.get("/info", routesProtected, controller.updateInfoPage);
router.post("/info", routesProtected, controller.updateInfo)
router.get("/email", routesProtected, controller.updateEmailPage);
router.post("/email", routesProtected, controller.updateEmail);
router.get("/password", routesProtected, controller.updatePasswordPage);
router.post("/password", routesProtected, controller.updatePassword);
router.get("/user/add-image/:id", routesProtected, controller.addImageUserPage);
router.post("/user/add-image/:id", routesProtected, uploadImageUser.single("img"), controller.addImageUser)

module.exports = router;