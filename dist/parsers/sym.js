"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sym = void 0;
function sym(a, b) {
    return function* (text) {
        const it1 = a(text);
        while (true) {
            const entry = it1.next();
            if (entry.done)
                break;
            yield entry.value;
        }
        const it2 = b(text);
        while (true) {
            const entry = it2.next();
            if (entry.done)
                break;
            yield entry.value;
        }
    };
}
exports.sym = sym;
