"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gather = void 0;
function gather(p) {
    return function* (text) {
        const it = p(text);
        while (true) {
            const entry = it.next();
            if (entry.done)
                return;
            const parsed = entry.value;
            const readString = text.substr(0, text.length - parsed.rest.length);
            yield { value: [readString, parsed.value], rest: parsed.rest };
        }
    };
}
exports.gather = gather;
