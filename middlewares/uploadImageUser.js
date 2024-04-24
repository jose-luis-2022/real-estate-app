const multer = require("multer");
const generateId = require("../helpers/tokenId");

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, generateId())
    }
});

const uploadUser = multer({storage});

module.exports = uploadUser;