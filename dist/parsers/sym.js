"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sym = void 0;
function sym(a, b) {
    return function* (text) {
        const it1 = a(text);
        const it2 = b(text);
        let step1 = it1.next();
        let step2 = it2.next();
        while (!step1.done && !step2.done) {
            if (step1.value.rest.length < step2.value.rest.length) {
                yield step1.value;
                step1 = it1.next();
            }
            else {
                yield step2.value;
                step2 = it2.next();
            }
        }
        if (step1.done && step2.done)
            return;
        if (step1.done) {
            while (!step2.done) {
                yield step2.value;
                step2 = it2.next();
            }
        }
        else {
            while (!step1.done) {
                yield step1.value;
                step1 = it1.next();
            }
        }
    };
}
exports.sym = sym;
