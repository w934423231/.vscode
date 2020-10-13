'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const 释义处理 = require("./\u7FFB\u8BD1/\u5904\u7406");
const 词典常量 = require("./\u7FFB\u8BD1/\u8BCD\u5178\u76F8\u5173\u5E38\u91CF");
const 功用库 = require("./\u529F\u7528\u5E93");
const 查词 = require("./\u67E5\u8BCD");
const vscode = require("vscode");
class 整文件翻译 {
    constructor() {
        this.原命名列表 = [];
    }
    dispose() {
    }
    provideTextDocumentContent(uri) {
        // TODO: 如果没有当前活跃编辑器, 返回空
        let textEditor = vscode.window.activeTextEditor;
        return vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', textEditor.document.uri)
            .then((symbols) => {
            for (var 标识符 of symbols) {
                this.原命名列表.push(释义处理.消除英文小括号内容(标识符.name));
                for (var 子标识符 of 标识符.children) {
                    this.原命名列表.push(释义处理.消除英文小括号内容(子标识符.name));
                }
            }
            // 长词先查释义, 以免出现一个命名"xxxxyyyy"先替换了yyyy而xxxx未替换的情况
            this.原命名列表.sort(function (a, b) { return b.length - a.length; });
            var 新内容 = textEditor.document.getText();
            for (var 原命名 of this.原命名列表) {
                let 中文释义 = 查词.取释义(原命名).释义;
                let 翻译 = 释义处理.取字段中所有词(原命名).length > 1
                    ? 中文释义
                    : 释义处理.首选(中文释义, 词典常量.词性_计算机);
                if (翻译) {
                    新内容 = this._replaceAll(新内容, 原命名, 翻译);
                }
            }
            return 新内容;
        });
    }
    _replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}
整文件翻译.scheme = 'references';
exports.default = 整文件翻译;
let seq = 0;
function encodeLocation(uri, pos) {
    const query = JSON.stringify([uri.toString(), pos.line, pos.character]);
    let 文件名 = 功用库.取文件名(uri.path);
    return vscode.Uri.parse(`${整文件翻译.scheme}:翻译${文件名}?${query}#${seq++}`);
}
exports.encodeLocation = encodeLocation;
//# sourceMappingURL=整文件翻译.js.map