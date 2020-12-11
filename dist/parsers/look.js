"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.look = void 0;
/**
 * Parses rest string without consuming
 * @param text input
 */
const look = function* (text) {
    yield { value: text, rest: text };
};
exports.look = look;
