var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import xs from 'xstream';
export class AsyncIterableProducer {
    constructor(iterable) {
        this.iterable = iterable;
        this.cancel = false;
    }
    start(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            try {
                try {
                    for (var _b = __asyncValues(this.iterable), _c; _c = yield _b.next(), !_c.done;) {
                        let item = _c.value;
                        listener.next(item);
                        if (this.cancel) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                listener.complete();
            }
            catch (err) {
                listener.error(err);
            }
        });
    }
    stop() {
        this.cancel = true;
    }
}
export function fromAsyncIterable(iterable) {
    return xs.create(new AsyncIterableProducer(iterable));
}
