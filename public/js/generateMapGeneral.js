/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/generate-map-general.js":
/*!****************************************!*\
  !*** ./src/js/generate-map-general.js ***!
  \****************************************/
/***/ (() => {

eval("(function () {\r\n    const lat = document.getElementById(\"lat\").textContent;\r\n    const lng = document.getElementById(\"lng\").textContent;\r\n    const street = document.getElementById(\"street\").textContent;\r\n    const map = L.map(\"map\").setView([lat, lng], 15);\r\n  \r\n    L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n      attribution:\r\n        '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n    }).addTo(map);\r\n  \r\n    L.marker([lat, lng])\r\n      .addTo(map)\r\n      .bindPopup(street)\r\n  })();\r\n  \n\n//# sourceURL=webpack://real-estates-node-project/./src/js/generate-map-general.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/generate-map-general.js"]();
/******/ 	
/******/ })()
;