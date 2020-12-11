"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const utils_1 = require("../utils");
/**
 * Parses single char
 */
const get = (text) => text.length > 0
    ? utils_1.iteratorOf({ value: text[0], rest: text.slice(1) })
    : utils_1.EMPTY_ITERATOR;
exports.get = get;
