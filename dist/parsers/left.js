"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.left = void 0;
function left(a, b) {
    return function* (text) {
        let isLeftUsed = false;
        const it1 = a(text);
        while (true) {
            const entry = it1.next();
            if (entry.done)
                break;
            isLeftUsed = true;
            yield entry.value;
        }
        if (isLeftUsed)
            return;
        const it2 = b(text);
        while (true) {
            const entry = it2.next();
            if (entry.done)
                return;
            yield entry.value;
        }
    };
}
exports.left = left;
