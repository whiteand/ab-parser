"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.look = void 0;
const utils_1 = require("../utils");
/**
 * Parses rest string without consuming
 * @param text input
 */
const look = (text) => utils_1.iteratorOf({ value: text, rest: text });
exports.look = look;
