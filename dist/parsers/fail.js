"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
const utils_1 = require("../utils");
/**
 * Always fails
 */
const fail = () => utils_1.EMPTY_ITERATOR;
exports.fail = fail;
