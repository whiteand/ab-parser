"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.satisfy = void 0;
const utils_1 = require("../utils");
/**
 * Consumes and returns the next character, if it satisfies the specified predicate.
 * @param pred is character valid
 */
function satisfy(pred) {
    return (text) => text.length > 0 && pred(text[0])
        ? utils_1.iteratorOf({ value: text[0], rest: text.slice(1) })
        : utils_1.EMPTY_ITERATOR;
}
exports.satisfy = satisfy;
