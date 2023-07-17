/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hello.ts":
/*!**********************!*\
  !*** ./src/hello.ts ***!
  \**********************/
/***/ (() => {

eval("\nvar message = \"Hello, World!\";\nvar hello = function (message) {\n    writeHTML(message);\n};\nvar writeHTML = function (message) {\n    console.log(document.body);\n    document.body.innerHTML += \"\".concat(message);\n    console.log(\"\".concat(message, \" \\u3092\\u51FA\\u529B\\u3057\\u307E\\u3057\\u305F\"));\n};\ndocument.addEventListener('DOMContentLoaded', function () {\n    hello(message);\n});\n\n\n//# sourceURL=webpack://my-canvas-games-sandbox/./src/hello.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/hello.ts"]();
/******/ 	
/******/ })()
;