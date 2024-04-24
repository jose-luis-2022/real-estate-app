const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        mapCreate: "./src/js/map-create.js",
        mapEdit: "./src/js/map-edit.js",
        addImageEstate: "./src/js/add-image-estate.js",
        addImageUser: "./src/js/add-image-user.js",
        changeEstate: "./src/js/change-estate.js",
        generalMap: "./src/js/general-map.js",
        generateMap: "./src/js/generate-map.js",
        generateMapGeneral: "./src/js/generate-map-general.js",
        updateInfoMessage: "/src/js/update-info-message.js",
        updatePasswordMessage: "/src/js/update-password-message.js",
        menuMobile: "./src/js/menu-mobile.js",
        menuMobileGeneral: "./src/js/menu-mobile-general.js",
        menuCategoriesUser: "./src/js/menu-categories-user.js",
        menuCategoriesNotUser: "./src/js/menu-categories-not-user.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
}