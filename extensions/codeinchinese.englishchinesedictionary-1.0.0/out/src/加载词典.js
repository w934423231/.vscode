"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.词典数据 = {};
exports.词形变化数据 = {};
function 导入数据() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let 文件序号 = 0; 文件序号 < 16; 文件序号++) {
            const 词典 = yield Promise.resolve().then(() => require('./词典数据/词典' + 文件序号));
            let 数据 = 词典.数据;
            for (let 英文 in 数据) {
                exports.词典数据[英文] = 数据[英文];
            }
        }
    });
}
let 词形变化源数据 = require('./词典数据/词形变化').数据;
for (let 英文 in 词形变化源数据) {
    exports.词形变化数据[英文] = 词形变化源数据[英文];
}
导入数据();
//# sourceMappingURL=加载词典.js.map