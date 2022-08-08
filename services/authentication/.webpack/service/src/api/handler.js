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
        catch (error) { }
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

const DynamoDBClient = () => {
    return new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().DynamoDB.DocumentClient)();
};


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
        this.GetByServiceAndSecretKey = async (service, secretKey) => {
            const DynamoDB = (0,_AWSProvider__WEBPACK_IMPORTED_MODULE_0__.DynamoDBClient)();
            const params = {
                TableName: `Api.Credential`,
                FilterExpression: 'service = :service AND secretKey = :secretKey',
                ExpressionAttributeValues: {
                    ':service': service,
                    ':secretKey': secretKey
                }
            };
            const data = await DynamoDB.scan(params).promise();
            return data.Items[0];
        };
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
        let credential = await this.credentialRepository.GetByServiceAndSecretKey(request.service, request.secretKey);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMMkU7QUFFM0UsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLDJFQUF1QixFQUFFLENBQUM7QUFFdkQsTUFBTSxhQUFhLEdBQTJCLEtBQUssRUFDdEQsS0FBMkIsRUFDRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXERUSSBEaWdpdGFsXFxEZXNrdG9wXFxyZW5hbi1hemFsaW1cXGF1dGhlbnRpY2F0aW9uXFxzZXJ2aWNlc1xcYXV0aGVudGljYXRpb25cXHNyY1xcYXBpXFxjb250cm9sbGVyXFxBdXRob3JpemF0aW9uQ29udHJvbGxlci50cyIsIkM6XFxVc2Vyc1xcRFRJIERpZ2l0YWxcXERlc2t0b3BcXHJlbmFuLWF6YWxpbVxcYXV0aGVudGljYXRpb25cXHNlcnZpY2VzXFxhdXRoZW50aWNhdGlvblxcc3JjXFxpbmZyYVxcZGF0YVxcQVdTUHJvdmlkZXIudHMiLCJDOlxcVXNlcnNcXERUSSBEaWdpdGFsXFxEZXNrdG9wXFxyZW5hbi1hemFsaW1cXGF1dGhlbnRpY2F0aW9uXFxzZXJ2aWNlc1xcYXV0aGVudGljYXRpb25cXHNyY1xcaW5mcmFcXGRhdGFcXHJlcG9zaXRvcmllc1xcQ3JlZGVudGlhbFJlcG9zaXRvcnkudHMiLCJDOlxcVXNlcnNcXERUSSBEaWdpdGFsXFxEZXNrdG9wXFxyZW5hbi1hemFsaW1cXGF1dGhlbnRpY2F0aW9uXFxzZXJ2aWNlc1xcYXV0aGVudGljYXRpb25cXHNyY1xcdXNlQ2FzZVxcQXV0aG9yaXphdGlvblVzZUNhc2UudHMiLCJleHRlcm5hbCBjb21tb25qcyBcImF3cy1zZGtcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJDOlxcVXNlcnNcXERUSSBEaWdpdGFsXFxEZXNrdG9wXFxyZW5hbi1hemFsaW1cXGF1dGhlbnRpY2F0aW9uXFxzZXJ2aWNlc1xcYXV0aGVudGljYXRpb25cXHNyY1xcYXBpXFxoYW5kbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvblJlcXVlc3QgZnJvbSBcIi4uLy4uL2RvbWFpbi9pbnRlcmZhY2UvcmVxdWVzdC9BdXRob3JpemF0aW9uUmVxdWVzdFwiO1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvblJlc3BvbnNlIGZyb20gXCIuLi8uLi9kb21haW4vaW50ZXJmYWNlL3Jlc3BvbnNlL0F1dGhvcml6YXRpb25SZXNwb25zZVwiO1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvblVzZUNhc2UgZnJvbSBcIi4uLy4uL3VzZUNhc2UvQXV0aG9yaXphdGlvblVzZUNhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGhvcml6YXRpb25Db250cm9sbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhvcml6YXRpb25Vc2VDYXNlID0gbmV3IEF1dGhvcml6YXRpb25Vc2VDYXNlKCk7XHJcblxyXG4gICAgYXN5bmMgYXV0aG9yaXphdGlvbihldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD57XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmF1dGhvcml6YXRpb25Vc2VDYXNlLmV4ZWN1dGUocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKVxyXG4gICAgICAgICAgfSBhcyBBUElHYXRld2F5UHJveHlSZXN1bHQ7XHJcblxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpeyB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEFXUyBmcm9tICdhd3Mtc2RrJztcclxuXHJcbmV4cG9ydCBjb25zdCBEeW5hbW9EQkNsaWVudCA9ICgpID0+IHtcclxuICByZXR1cm4gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBJQ3JlZGVudGlhbFJlcG9zaXRvcnksIElHZXRCeVNlcnZpY2VkQW5kU2VjcmV0S2V5IH0gZnJvbSBcIi4uLy4uLy4uL2RvbWFpbi9pbnRlcmZhY2UvcmVwb3NpdG9yaWVzL0lDcmVkZW50aWFsUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbCBmcm9tIFwiLi4vLi4vLi4vZG9tYWluL21vZGVsL0NyZWRlbnRpYWxcIjtcclxuaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tIFwiLi4vQVdTUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVkZW50aWFsUmVwb3NpdG9yeSBpbXBsZW1lbnRzIElDcmVkZW50aWFsUmVwb3NpdG9yeXtcclxuICAgIEdldEJ5U2VydmljZUFuZFNlY3JldEtleTogSUdldEJ5U2VydmljZWRBbmRTZWNyZXRLZXkgPSBhc3luYyAoc2VydmljZSwgc2VjcmV0S2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IER5bmFtb0RCID0gRHluYW1vREJDbGllbnQoKTtcclxuICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogYEFwaS5DcmVkZW50aWFsYCxcclxuICAgICAgICBGaWx0ZXJFeHByZXNzaW9uOlxyXG4gICAgICAgICAgJ3NlcnZpY2UgPSA6c2VydmljZSBBTkQgc2VjcmV0S2V5ID0gOnNlY3JldEtleScsXHJcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICAgICAgJzpzZXJ2aWNlJzogc2VydmljZSxcclxuICAgICAgICAgICc6c2VjcmV0S2V5Jzogc2VjcmV0S2V5XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgRHluYW1vREIuc2NhbihwYXJhbXMpLnByb21pc2UoKTtcclxuICAgICAgcmV0dXJuIGRhdGEuSXRlbXNbMF0gYXMgQ3JlZGVudGlhbDtcclxuICAgIH07XHJcbiAgICBcclxufSIsImltcG9ydCAqIGFzIGp3dCBmcm9tICdqc29ud2VidG9rZW4nXHJcbmltcG9ydCB7IElDcmVkZW50aWFsUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9kb21haW4vaW50ZXJmYWNlL3JlcG9zaXRvcmllcy9JQ3JlZGVudGlhbFJlcG9zaXRvcnlcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25SZXF1ZXN0IGZyb20gXCIuLi9kb21haW4vaW50ZXJmYWNlL3JlcXVlc3QvQXV0aG9yaXphdGlvblJlcXVlc3RcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25SZXNwb25zZSBmcm9tIFwiLi4vZG9tYWluL2ludGVyZmFjZS9yZXNwb25zZS9BdXRob3JpemF0aW9uUmVzcG9uc2VcIjtcclxuaW1wb3J0IENyZWRlbnRpYWwgZnJvbSBcIi4uL2RvbWFpbi9tb2RlbC9DcmVkZW50aWFsXCI7XHJcbmltcG9ydCB7IENyZWRlbnRpYWxSZXBvc2l0b3J5IH0gZnJvbSBcIi4uL2luZnJhL2RhdGEvcmVwb3NpdG9yaWVzL0NyZWRlbnRpYWxSZXBvc2l0b3J5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRob3JpemF0aW9uVXNlQ2FzZXtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNyZWRlbnRpYWxSZXBvc2l0b3J5OiBJQ3JlZGVudGlhbFJlcG9zaXRvcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNyZWRlbnRpYWxSZXBvc2l0b3J5ID0gbmV3IENyZWRlbnRpYWxSZXBvc2l0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlc3BvbnNlPiB7XHJcbiAgICAgICAgLy9CVVNDQVIgREFET1MgQ09NIEJBU0UgTk8gQ0xJRU5USUQgRSBTRUNSRVRLRVlcclxuICAgICAgICBsZXQgY3JlZGVudGlhbDogQ3JlZGVudGlhbCA9IGF3YWl0IHRoaXMuY3JlZGVudGlhbFJlcG9zaXRvcnkuR2V0QnlTZXJ2aWNlQW5kU2VjcmV0S2V5KHJlcXVlc3Quc2VydmljZSwgcmVxdWVzdC5zZWNyZXRLZXkpO1xyXG4gICAgICAgIGlmKGNyZWRlbnRpYWwpe1xyXG4gICAgICAgICAgICAvL1ZBTElEQVIgU0UgTyBVU1VBUklPIFRFTSBQRVJNSVNTQU9cclxuICAgICAgICAgICAgLy9HRVJBUiBVTSBUT0tFTiBFIFJFVE9STkFSXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiByZXF1ZXN0LnNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICB0b2tlbjogand0LnNpZ24oY3JlZGVudGlhbC5yb2xlcywgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVF9LRVksIHsgZXhwaXJlc0luOiBwcm9jZXNzLmVudi5KV1RfRVhQSVJFU19UT0tFTiwgYWxnb3JpdGhtOiAnSFMyNTYnIH0pXHJcbiAgICAgICAgICAgIH0gYXMgQXV0aG9yaXphdGlvblJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gICAgIFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3cy1zZGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5SGFuZGxlciwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IEF1dGhvcml6YXRpb25Db250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvQXV0aG9yaXphdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IGF1dGhvcml6YXRpb25Db250cm9sbGVyID0gbmV3IEF1dGhvcml6YXRpb25Db250cm9sbGVyKCk7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aG9yaXphdGlvbjogQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IGFzeW5jIChcclxuICAgIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxyXG4pOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4gYXV0aG9yaXphdGlvbkNvbnRyb2xsZXIuYXV0aG9yaXphdGlvbihldmVudCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9