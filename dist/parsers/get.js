"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
/**
 * Parses single char
 */
function* get(text) {
    if (text.length > 0) {
        yield { value: text[0], rest: text.slice(1) };
    }
}
exports.get = get;
