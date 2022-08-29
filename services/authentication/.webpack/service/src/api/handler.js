/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/controller/AuthorizationController.ts":
/*!*******************************************************!*\
  !*** ./src/api/controller/AuthorizationController.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthorizationController)
/* harmony export */ });
/* harmony import */ var _useCase_AuthorizationUseCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../useCase/AuthorizationUseCase */ "./src/useCase/AuthorizationUseCase.ts");

class AuthorizationController {
    constructor() {
        this.authorizationUseCase = new _useCase_AuthorizationUseCase__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    async authorization(event) {
        const request = JSON.parse(event.body);
        try {
            const response = await this.authorizationUseCase.execute(request);
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            };
            return {
                headers,
                statusCode: 200,
                body: JSON.stringify(response)
            };
        }
        catch (error) {
            return { statusCode: 500 };
        }
    }
}


/***/ }),

/***/ "./src/infra/data/AWSProvider.ts":
/*!***************************************!*\
  !*** ./src/infra/data/AWSProvider.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DynamoDBClient": () => (/* binding */ DynamoDBClient)
/* harmony export */ });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);

const DynamoDBClient = () => new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().DynamoDB.DocumentClient)();


/***/ }),

/***/ "./src/infra/data/repositories/CredentialRepository.ts":
/*!*************************************************************!*\
  !*** ./src/infra/data/repositories/CredentialRepository.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CredentialRepository": () => (/* binding */ CredentialRepository)
/* harmony export */ });
/* harmony import */ var _AWSProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AWSProvider */ "./src/infra/data/AWSProvider.ts");

class CredentialRepository {
    constructor() {
        this.dynamoDbClient = (0,_AWSProvider__WEBPACK_IMPORTED_MODULE_0__.DynamoDBClient)();
    }
    async getByServiceAndSecretKey(service, secretKey) {
        const params = {
            TableName: `Api.Credential`,
            FilterExpression: 'service = :service AND secretKey = :secretKey',
            ExpressionAttributeValues: {
                ':service': service,
                ':secretKey': secretKey
            }
        };
        return (await this.dynamoDbClient.query(params).promise()).Items[0];
    }
}


/***/ }),

/***/ "./src/useCase/AuthorizationUseCase.ts":
/*!*********************************************!*\
  !*** ./src/useCase/AuthorizationUseCase.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthorizationUseCase)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _infra_data_repositories_CredentialRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infra/data/repositories/CredentialRepository */ "./src/infra/data/repositories/CredentialRepository.ts");


class AuthorizationUseCase {
    constructor() {
        this.credentialRepository = new _infra_data_repositories_CredentialRepository__WEBPACK_IMPORTED_MODULE_1__.CredentialRepository();
    }
    async execute(request) {
        const credential = await this.credentialRepository.getByServiceAndSecretKey(request.service, request.secretKey);
        if (credential) {
            return {
                service: request.service,
                token: jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.sign(credential.roles, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TOKEN, algorithm: 'HS256' })
            };
        }
        return null;
    }
}


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/api/handler.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authorization": () => (/* binding */ authorization)
/* harmony export */ });
/* harmony import */ var _controller_AuthorizationController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/AuthorizationController */ "./src/api/controller/AuthorizationController.ts");

const authorizationController = new _controller_AuthorizationController__WEBPACK_IMPORTED_MODULE_0__["default"]();
const authorization = async (event) => authorizationController.authorization(event);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDJFO0FBRTNFLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSwyRUFBdUIsRUFBRSxDQUFDO0FBRXZELE1BQU0sYUFBYSxHQUEyQixLQUFLLEVBQ3RELEtBQTJCLEVBQ0csRUFBRSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxEVEkgRGlnaXRhbFxcRGVza3RvcFxccmVuYW4tYXphbGltXFxhdXRoZW50aWNhdGlvblxcc2VydmljZXNcXGF1dGhlbnRpY2F0aW9uXFxzcmNcXGFwaVxcY29udHJvbGxlclxcQXV0aG9yaXphdGlvbkNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXERUSSBEaWdpdGFsXFxEZXNrdG9wXFxyZW5hbi1hemFsaW1cXGF1dGhlbnRpY2F0aW9uXFxzZXJ2aWNlc1xcYXV0aGVudGljYXRpb25cXHNyY1xcaW5mcmFcXGRhdGFcXEFXU1Byb3ZpZGVyLnRzIiwiQzpcXFVzZXJzXFxEVEkgRGlnaXRhbFxcRGVza3RvcFxccmVuYW4tYXphbGltXFxhdXRoZW50aWNhdGlvblxcc2VydmljZXNcXGF1dGhlbnRpY2F0aW9uXFxzcmNcXGluZnJhXFxkYXRhXFxyZXBvc2l0b3JpZXNcXENyZWRlbnRpYWxSZXBvc2l0b3J5LnRzIiwiQzpcXFVzZXJzXFxEVEkgRGlnaXRhbFxcRGVza3RvcFxccmVuYW4tYXphbGltXFxhdXRoZW50aWNhdGlvblxcc2VydmljZXNcXGF1dGhlbnRpY2F0aW9uXFxzcmNcXHVzZUNhc2VcXEF1dGhvcml6YXRpb25Vc2VDYXNlLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJhd3Mtc2RrXCIiLCJleHRlcm5hbCBjb21tb25qcyBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0IiwiQzpcXFVzZXJzXFxEVEkgRGlnaXRhbFxcRGVza3RvcFxccmVuYW4tYXphbGltXFxhdXRoZW50aWNhdGlvblxcc2VydmljZXNcXGF1dGhlbnRpY2F0aW9uXFxzcmNcXGFwaVxcaGFuZGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25SZXF1ZXN0IGZyb20gXCIuLi8uLi9kb21haW4vaW50ZXJmYWNlL3JlcXVlc3QvQXV0aG9yaXphdGlvblJlcXVlc3RcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25SZXNwb25zZSBmcm9tIFwiLi4vLi4vZG9tYWluL2ludGVyZmFjZS9yZXNwb25zZS9BdXRob3JpemF0aW9uUmVzcG9uc2VcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25Vc2VDYXNlIGZyb20gXCIuLi8uLi91c2VDYXNlL0F1dGhvcml6YXRpb25Vc2VDYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRob3JpemF0aW9uQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRob3JpemF0aW9uVXNlQ2FzZSA9IG5ldyBBdXRob3JpemF0aW9uVXNlQ2FzZSgpO1xyXG5cclxuICAgIGFzeW5jIGF1dGhvcml6YXRpb24oZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+e1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcclxuICAgICAgICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5hdXRob3JpemF0aW9uVXNlQ2FzZS5leGVjdXRlKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWVcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZSlcclxuICAgICAgICAgIH0gYXMgQVBJR2F0ZXdheVByb3h5UmVzdWx0O1xyXG5cclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuXHJcbiAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAgfSBhcyBBUElHYXRld2F5UHJveHlSZXN1bHQ7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQVdTIGZyb20gJ2F3cy1zZGsnO1xyXG5cclxuZXhwb3J0IGNvbnN0IER5bmFtb0RCQ2xpZW50ID0gKCkgPT4gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xyXG4iLCJpbXBvcnQgQ3JlZGVudGlhbCBmcm9tIFwiLi4vLi4vLi4vZG9tYWluL21vZGVsL0NyZWRlbnRpYWxcIjtcclxuaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tIFwiLi4vQVdTUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVkZW50aWFsUmVwb3NpdG9yeSB7XHJcbiAgICBwcml2YXRlIGR5bmFtb0RiQ2xpZW50ID0gRHluYW1vREJDbGllbnQoKTtcclxuXHJcbiAgICBhc3luYyBnZXRCeVNlcnZpY2VBbmRTZWNyZXRLZXkoc2VydmljZTogc3RyaW5nLCBzZWNyZXRLZXk6IHN0cmluZyk6IFByb21pc2U8Q3JlZGVudGlhbD4ge1xyXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgVGFibGVOYW1lOiBgQXBpLkNyZWRlbnRpYWxgLFxyXG4gICAgICAgIEZpbHRlckV4cHJlc3Npb246XHJcbiAgICAgICAgICAnc2VydmljZSA9IDpzZXJ2aWNlIEFORCBzZWNyZXRLZXkgPSA6c2VjcmV0S2V5JyxcclxuICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XHJcbiAgICAgICAgICAnOnNlcnZpY2UnOiBzZXJ2aWNlLFxyXG4gICAgICAgICAgJzpzZWNyZXRLZXknOiBzZWNyZXRLZXlcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5keW5hbW9EYkNsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKSkuSXRlbXNbMF0gYXMgQ3JlZGVudGlhbDtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvblJlcXVlc3QgZnJvbSBcIi4uL2RvbWFpbi9pbnRlcmZhY2UvcmVxdWVzdC9BdXRob3JpemF0aW9uUmVxdWVzdFwiO1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvblJlc3BvbnNlIGZyb20gXCIuLi9kb21haW4vaW50ZXJmYWNlL3Jlc3BvbnNlL0F1dGhvcml6YXRpb25SZXNwb25zZVwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbCBmcm9tIFwiLi4vZG9tYWluL21vZGVsL0NyZWRlbnRpYWxcIjtcclxuaW1wb3J0IHsgQ3JlZGVudGlhbFJlcG9zaXRvcnkgfSBmcm9tIFwiLi4vaW5mcmEvZGF0YS9yZXBvc2l0b3JpZXMvQ3JlZGVudGlhbFJlcG9zaXRvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGhvcml6YXRpb25Vc2VDYXNle1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjcmVkZW50aWFsUmVwb3NpdG9yeTogQ3JlZGVudGlhbFJlcG9zaXRvcnkgPVxyXG4gICAgbmV3IENyZWRlbnRpYWxSZXBvc2l0b3J5KCk7XHJcblxyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlc3BvbnNlPiB7XHJcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbDogQ3JlZGVudGlhbCA9IGF3YWl0IHRoaXMuY3JlZGVudGlhbFJlcG9zaXRvcnkuZ2V0QnlTZXJ2aWNlQW5kU2VjcmV0S2V5KHJlcXVlc3Quc2VydmljZSwgcmVxdWVzdC5zZWNyZXRLZXkpO1xyXG4gICAgICAgIGlmKGNyZWRlbnRpYWwpe1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZTogcmVxdWVzdC5zZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IGp3dC5zaWduKGNyZWRlbnRpYWwucm9sZXMsIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRfS0VZLCB7IGV4cGlyZXNJbjogcHJvY2Vzcy5lbnYuSldUX0VYUElSRVNfVE9LRU4sIGFsZ29yaXRobTogJ0hTMjU2JyB9KVxyXG4gICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9ICAgICBcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eUhhbmRsZXIsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCBBdXRob3JpemF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL0F1dGhvcml6YXRpb25Db250cm9sbGVyXCI7XHJcblxyXG5jb25zdCBhdXRob3JpemF0aW9uQ29udHJvbGxlciA9IG5ldyBBdXRob3JpemF0aW9uQ29udHJvbGxlcigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhvcml6YXRpb246IEFQSUdhdGV3YXlQcm94eUhhbmRsZXIgPSBhc3luYyAoXHJcbiAgICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcclxuKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IGF1dGhvcml6YXRpb25Db250cm9sbGVyLmF1dGhvcml6YXRpb24oZXZlbnQpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==