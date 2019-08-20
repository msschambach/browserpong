/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/components/Ball.ts":
/*!***********************************!*\
  !*** ./src/ts/components/Ball.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/ts/components/core.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Ball = /** @class */ (function (_super) {\n    __extends(Ball, _super);\n    function Ball(canvas, context, xPosition, yPosition, speed) {\n        var _this = _super.call(this) || this;\n        _this.canvas = canvas;\n        _this.context = context;\n        _this.xPosition = xPosition;\n        _this.yPosition = yPosition;\n        _this.radius = 10;\n        _this.strokeStyle = '#ffffff';\n        _this.fillStyle = '#ffffff';\n        _this.xDelta = speed;\n        _this.yDelta = speed;\n        _this.touchesLeftSideOfWindow = false;\n        _this.touchesRightSideOfWindow = false;\n        _this.touchesTopSideOfWindow = false;\n        _this.touchesBottomSideOfWindow = false;\n        return _this;\n    }\n    Ball.prototype.reset = function () {\n        this.xPosition = this.canvas.width / 2;\n        this.yPosition = this.canvas.height / 2;\n        this.yDelta = 0;\n    };\n    Ball.prototype.draw = function () {\n        this.context.strokeStyle = this.strokeStyle;\n        this.context.fillStyle = this.fillStyle;\n        this.context.beginPath();\n        this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);\n        this.context.stroke();\n        this.context.fill();\n    };\n    Ball.prototype.move = function () {\n        if (this.touchesTopSideOfWindow || this.touchesBottomSideOfWindow) {\n            this.yDelta = -this.yDelta;\n        }\n        this.xPosition += this.xDelta;\n        this.yPosition += this.yDelta;\n        this.touchesLeftSideOfWindow = (this.xPosition < 0);\n        this.touchesRightSideOfWindow = (this.xPosition > (this.canvas.width - 0));\n        this.touchesTopSideOfWindow = (this.yPosition < this.radius);\n        this.touchesBottomSideOfWindow = (this.yPosition > (this.canvas.height - this.radius));\n        this.updateObservers(this);\n    };\n    Ball.prototype.touchesLeftSideOfWindowWithPaddle = function (paddle) {\n        return (this.xPosition < (this.radius + paddle.width)) && (this.yPosition > paddle.yPosition && this.yPosition < (paddle.yPosition + paddle.height));\n    };\n    Ball.prototype.touchesRightSideOfWindowWithPaddle = function (paddle) {\n        return (this.xPosition > (this.canvas.width - (this.radius + paddle.width))) && (this.yPosition > paddle.yPosition && this.yPosition < (paddle.yPosition + paddle.height));\n    };\n    Ball.prototype.animate = function () {\n        this.move();\n        this.draw();\n    };\n    Ball.prototype.debugInfo = function (context) {\n        var TEXT_X_POSITION = (context.canvas.width / 2) - 50;\n        var TEXT_Y_START_POSITION = context.canvas.height - 100;\n        context.font = \"10px Helvetica\";\n        context.fillText(\"Ball xPos: \" + this.xPosition, TEXT_X_POSITION, TEXT_Y_START_POSITION);\n        context.fillText(\"Ball yPos: \" + this.yPosition, TEXT_X_POSITION, TEXT_Y_START_POSITION + 15);\n        context.fillText(\"Ball xDelta: \" + this.xDelta, TEXT_X_POSITION, TEXT_Y_START_POSITION + 30);\n        context.fillText(\"Ball yDelta: \" + this.yDelta, TEXT_X_POSITION, TEXT_Y_START_POSITION + 45);\n    };\n    return Ball;\n}(_core__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n\n//# sourceURL=webpack:///./src/ts/components/Ball.ts?");

/***/ }),

/***/ "./src/ts/components/Paddle.ts":
/*!*************************************!*\
  !*** ./src/ts/components/Paddle.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/ts/components/core.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Paddle = /** @class */ (function (_super) {\n    __extends(Paddle, _super);\n    function Paddle(canvas, context, xPosition, yPosition, width, height) {\n        var _this = _super.call(this) || this;\n        _this.canvas = canvas;\n        _this.context = context;\n        _this.xPosition = xPosition;\n        _this.yPosition = yPosition;\n        _this.strokeStyle = '#ffffff';\n        _this.fillStyle = '#ffffff';\n        _this.width = width;\n        _this.height = height;\n        return _this;\n    }\n    Paddle.prototype.draw = function () {\n        this.context.strokeStyle = this.strokeStyle;\n        this.context.fillStyle = this.fillStyle;\n        this.context.fillRect(this.xPosition, this.yPosition, this.width, this.height);\n    };\n    Paddle.prototype.move = function (cursorPosition) {\n        if (cursorPosition === void 0) { cursorPosition = {}; }\n        this.yPosition = (cursorPosition.y - (this.height / 2)) || this.yPosition;\n        this.updateObservers(this);\n    };\n    Paddle.prototype.animate = function () {\n        this.move();\n        this.draw();\n    };\n    return Paddle;\n}(_core__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (Paddle);\n\n\n//# sourceURL=webpack:///./src/ts/components/Paddle.ts?");

/***/ }),

/***/ "./src/ts/components/core.ts":
/*!***********************************!*\
  !*** ./src/ts/components/core.ts ***!
  \***********************************/
/*! exports provided: GameObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameObject\", function() { return GameObject; });\nvar GameObject = /** @class */ (function () {\n    function GameObject() {\n        this.observerHandlers = [];\n    }\n    GameObject.prototype.subscribe = function (fn) {\n        if (typeof fn == 'function') {\n            this.observerHandlers.push(fn);\n        }\n    };\n    GameObject.prototype.unsubscribe = function (fn) {\n        if (typeof fn == 'function') {\n            this.observerHandlers = this.observerHandlers.filter(function (item) {\n                if (item !== fn) {\n                    return item;\n                }\n            });\n        }\n    };\n    GameObject.prototype.updateObservers = function (scope) {\n        this.observerHandlers.forEach(function (fn) {\n            fn(scope);\n        });\n    };\n    return GameObject;\n}());\n\n\n\n//# sourceURL=webpack:///./src/ts/components/core.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Paddle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Paddle */ \"./src/ts/components/Paddle.ts\");\n/* harmony import */ var _components_Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Ball */ \"./src/ts/components/Ball.ts\");\n\n\nvar canvas;\nvar canvasContext;\nvar PongBall;\nvar LeftPaddle;\nvar RightPaddle;\nvar PADDLE_HEIGHT = 100;\nvar PADDLE_THICKNESS = 10;\nvar FRAMES_PER_SECOND = 60;\nvar humanPlayerScore = 0;\nvar aiPlayerScore = 0;\nfunction fillRectangle(left, top, width, height, style) {\n    canvasContext.strokeStyle = style;\n    canvasContext.fillStyle = style;\n    canvasContext.fillRect(left, top, width, height);\n}\nfunction locateCursor(event) {\n    var canvasRect = canvas.getBoundingClientRect();\n    var rootElement = document.documentElement;\n    var mouseX = event.clientX - canvasRect.left - rootElement.scrollLeft;\n    var mouseY = event.clientY - canvasRect.top - rootElement.scrollTop;\n    return {\n        x: mouseX,\n        y: mouseY\n    };\n}\nfunction draw() {\n    // Make the canvas background black\n    fillRectangle(0, 0, canvas.width, canvas.height, '#000000');\n    // Animate the left paddle\n    LeftPaddle.animate();\n    // Animate the right paddle\n    RightPaddle.animate();\n    // Animate the ball\n    PongBall.animate();\n    // Write Scores\n    canvasContext.font = \"30px Barriecito\";\n    canvasContext.fillText(String(humanPlayerScore), 100, 100);\n    canvasContext.fillText(String(aiPlayerScore), canvas.width - 100, 100);\n    PongBall.debugInfo(canvasContext);\n}\nwindow.onload = function () {\n    canvas = document.getElementById('gameCanvas');\n    canvasContext = canvas.getContext('2d');\n    PongBall = new _components_Ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas, canvasContext, 20, 20, 8);\n    LeftPaddle = new _components_Paddle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, canvasContext, 0, 250, PADDLE_THICKNESS, PADDLE_HEIGHT);\n    RightPaddle = new _components_Paddle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, canvasContext, canvas.width - PADDLE_THICKNESS, 250, PADDLE_THICKNESS, PADDLE_HEIGHT);\n    function ballObserver(ball) {\n        if (ball.touchesLeftSideOfWindowWithPaddle(LeftPaddle)) {\n            ball.xDelta = -ball.xDelta;\n            ball.yDelta = (ball.yPosition - (LeftPaddle.yPosition + LeftPaddle.height / 2)) * 0.35;\n        }\n        else if (ball.touchesRightSideOfWindowWithPaddle(RightPaddle)) {\n            ball.xDelta = -ball.xDelta;\n            ball.yDelta = (ball.yPosition - (RightPaddle.yPosition + RightPaddle.height / 2)) * 0.35;\n        }\n        else if (ball.touchesLeftSideOfWindow) {\n            ball.reset();\n            aiPlayerScore++;\n        }\n        else if (ball.touchesRightSideOfWindow) {\n            ball.reset();\n            humanPlayerScore++;\n        }\n    }\n    function rightPaddleController(ball) {\n        var rightPaddleCenter = (RightPaddle.yPosition + (RightPaddle.height / 2));\n        var paddleShift = 0;\n        if (ball.yDelta > 5 || ball.yDelta < -5) {\n            /* If ball is going up or down with a\n            speed of around 5 units and above */\n            paddleShift = 17;\n        }\n        else if (ball.yDelta <= 5 || ball.yDelta >= -5) {\n            /* If ball is going up or down with a\n            speed of less than 5 units */\n            paddleShift = 5;\n        }\n        else if (ball.yDelta < 1) {\n            paddleShift = ball.yDelta * 10;\n        }\n        else {\n            paddleShift = ball.yDelta;\n        }\n        if ((rightPaddleCenter < ball.yPosition) && (ball.yDelta > 2 || ball.yDelta < -2)) {\n            RightPaddle.yPosition += paddleShift;\n        }\n        if ((rightPaddleCenter > ball.yPosition) && (ball.yDelta > 2 || ball.yDelta < -2)) {\n            RightPaddle.yPosition -= paddleShift;\n        }\n    }\n    PongBall.subscribe(ballObserver);\n    PongBall.subscribe(rightPaddleController);\n    canvas.addEventListener('mousemove', function (event) {\n        LeftPaddle.move(locateCursor(event));\n    });\n    setInterval(draw, 1000 / FRAMES_PER_SECOND);\n};\n\n\n//# sourceURL=webpack:///./src/ts/main.ts?");

/***/ })

/******/ });