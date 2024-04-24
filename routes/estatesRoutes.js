const express = require("express");
const routesProtected = require("../middlewares/routesProtected");
const uploadImageEstate = require("../middlewares/uploadImageEstate");
const router = express.Router();

const controller = require("../controllers/estatesController");

router.get("/my-estates", routesProtected, controller.myEstatesPage);
router.get("/create-estate", routesProtected, controller.createEstatePage);
router.post("/create-estate", routesProtected, controller.createEstate);
router.get("/estate/add-img/:id", routesProtected, controller.addImageEstatePage);
router.post("/estate/add-image/:id", routesProtected, uploadImageEstate.single("img"), controller.addImageEstate)
router.get("/edit-estate/:id", routesProtected, controller.editEstatePage);
router.post("/edit-estate/:id", routesProtected, controller.editEstate);
router.post("/delete-estate/:id", routesProtected, controller.deleteEstate);
router.get("/estate/:id", routesProtected, controller.showEstate)
router.post("/estate/:id", routesProtected, controller.changeState);
router.get("/messages/estate/:id", routesProtected , controller.watchMessages);
router.post("/message/estate/:id", routesProtected, controller.sendMessage);


module.exports = router;