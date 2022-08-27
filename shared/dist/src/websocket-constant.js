(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RECEIVE_CHAT = exports.GET_LIKE = exports.ITEM_UPLOADED = exports.SEND_CHAT = exports.SEND_LIKE = exports.ITEM_UPLOAD = exports.AUTH = exports.FOCUS = void 0;
    var FOCUS = 'focus';
    exports.FOCUS = FOCUS;
    var AUTH = 'auth';
    exports.AUTH = AUTH;
    var ITEM_UPLOAD = 'item-upload';
    exports.ITEM_UPLOAD = ITEM_UPLOAD;
    var SEND_LIKE = 'send-like';
    exports.SEND_LIKE = SEND_LIKE;
    var SEND_CHAT = 'send-chat';
    exports.SEND_CHAT = SEND_CHAT;
    var ITEM_UPLOADED = 'item-uploaded';
    exports.ITEM_UPLOADED = ITEM_UPLOADED;
    var GET_LIKE = 'get-like';
    exports.GET_LIKE = GET_LIKE;
    var RECEIVE_CHAT = 'receive-chat';
    exports.RECEIVE_CHAT = RECEIVE_CHAT;
});
