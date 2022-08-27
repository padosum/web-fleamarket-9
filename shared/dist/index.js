(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./src/websocket-constant"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RECEIVE_CHAT = exports.GET_LIKE = exports.ITEM_UPLOADED = exports.SEND_CHAT = exports.SEND_LIKE = exports.ITEM_UPLOAD = exports.AUTH = exports.FOCUS = void 0;
    var websocket_constant_1 = require("./src/websocket-constant");
    Object.defineProperty(exports, "AUTH", { enumerable: true, get: function () { return websocket_constant_1.AUTH; } });
    Object.defineProperty(exports, "FOCUS", { enumerable: true, get: function () { return websocket_constant_1.FOCUS; } });
    Object.defineProperty(exports, "GET_LIKE", { enumerable: true, get: function () { return websocket_constant_1.GET_LIKE; } });
    Object.defineProperty(exports, "ITEM_UPLOAD", { enumerable: true, get: function () { return websocket_constant_1.ITEM_UPLOAD; } });
    Object.defineProperty(exports, "ITEM_UPLOADED", { enumerable: true, get: function () { return websocket_constant_1.ITEM_UPLOADED; } });
    Object.defineProperty(exports, "RECEIVE_CHAT", { enumerable: true, get: function () { return websocket_constant_1.RECEIVE_CHAT; } });
    Object.defineProperty(exports, "SEND_CHAT", { enumerable: true, get: function () { return websocket_constant_1.SEND_CHAT; } });
    Object.defineProperty(exports, "SEND_LIKE", { enumerable: true, get: function () { return websocket_constant_1.SEND_LIKE; } });
});
