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

/***/ "./src/js/map-edit.js":
/*!****************************!*\
  !*** ./src/js/map-edit.js ***!
  \****************************/
/***/ (() => {

eval("(function() {\r\n    const lat = document.getElementById(\"latitude\").value ? document.getElementById(\"latitude\").value : 33.7190575;\r\n    const lng = document.getElementById(\"longitude\").value ? document.getElementById(\"longitude\").value : -84.3917458;\r\n    const map = L.map('map').setView([lat, lng ], 14);\r\n    let marker;\r\n    \r\n    const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    marker = new L.marker([lat, lng], {\r\n        draggable: true,\r\n        autoPan: true\r\n    }).addTo(map);\r\n\r\n    marker.on(\"moveend\", function(e){\r\n        marker = e.target\r\n        const position = marker.getLatLng();\r\n        map.panTo(new L.LatLng(position.lat, position.lng))\r\n\r\n        geocodeService.reverse().latlng(position, 13).run(function(error, result){\r\n            marker.bindPopup(result.address.LongLabel);\r\n            document.querySelector(\".street\").textContent = result?.address?.Address ?? \"\"\r\n            document.getElementById(\"street\").value = result?.address?.Address ?? \"\"\r\n            document.getElementById(\"latitude\").value = result?.latlng?.lat ?? \"\"\r\n            document.getElementById(\"longitude\").value = result?.latlng?.lng ?? \"\"\r\n        });\r\n    })\r\n\r\n\r\n})()\n\n//# sourceURL=webpack://real-estates-node-project/./src/js/map-edit.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map-edit.js"]();
/******/ 	
/******/ })()
;