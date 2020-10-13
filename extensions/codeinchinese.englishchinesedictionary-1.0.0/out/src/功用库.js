"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function 取文件名(文件全路径) {
    let 拆分路径 = 文件全路径.split("/");
    return 拆分路径.length > 1 ? 拆分路径[拆分路径.length - 1] : 文件全路径;
}
exports.取文件名 = 取文件名;
//# sourceMappingURL=功用库.js.map