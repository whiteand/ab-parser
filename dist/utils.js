"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iteratorOf = exports.EMPTY_ITERATOR = exports.DONE_ITERATOR_RESULT = void 0;
exports.DONE_ITERATOR_RESULT = { value: undefined, done: true };
exports.EMPTY_ITERATOR = {
    next() {
        return exports.DONE_ITERATOR_RESULT;
    },
};
function iteratorOf(value) {
    let isDone = false;
    return {
        next() {
            if (isDone)
                return exports.DONE_ITERATOR_RESULT;
            isDone = true;
            return { value, done: false };
        },
    };
}
exports.iteratorOf = iteratorOf;
