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

/***/ "./src/games/bouncing_balls/main.ts":
/*!******************************************!*\
  !*** ./src/games/bouncing_balls/main.ts ***!
  \******************************************/
/***/ (() => {

eval("\ndocument.addEventListener('DOMContentLoaded', function () {\n    var canvas = document.getElementById('myCanvas');\n    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');\n    if (ctx == null) {\n        console.log('Cannot get canvas element');\n        return;\n    }\n    var ball = {\n        x: 25,\n        y: 25\n    };\n    var velocity = 3;\n    var startingAngle = 70;\n    var rad = 20;\n    var moveX = Math.cos(Math.PI / 180 * startingAngle) * velocity;\n    var moveY = Math.sin(Math.PI / 180 * startingAngle) * velocity;\n    var draw = function () {\n        var clientRect = canvas.getBoundingClientRect();\n        ctx.clearRect(0, 0, clientRect.width, clientRect.height);\n        if (ball.x > clientRect.width - rad || ball.x < rad) {\n            moveX = -moveX;\n        }\n        if (ball.y > clientRect.height - rad || ball.y < rad) {\n            moveY = -moveY;\n        }\n        ball.x += moveX;\n        ball.y += moveY;\n        ctx.beginPath();\n        ctx.fillStyle = 'green';\n        ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2);\n        ctx.fill();\n        ctx.closePath();\n        // requestAnimationFrame(draw)\n    };\n    // draw()\n    setInterval(draw, 10);\n});\n\n\n//# sourceURL=webpack://my-canvas-games-sandbox/./src/games/bouncing_balls/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/games/bouncing_balls/main.ts"]();
/******/ 	
/******/ })()
;