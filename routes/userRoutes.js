const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/sign-in", controller.signInPage);
router.post("/sign-in", controller.signIn)
router.get("/sign-up", controller.signUpPage);
router.post("/sign-up", controller.signUp);
router.get("/forgot-password", controller.forgotPasswordPage);
router.post("/forgot-password", controller.forgotPassword);
router.get("/reset-password/:token", controller.resetPasswordPage);
router.post("/reset-password/:token", controller.resetPassword);
router.get("/confirm/:token", controller.confirmAccount);
router.post("/log-out", controller.logOut)



module.exports = router;