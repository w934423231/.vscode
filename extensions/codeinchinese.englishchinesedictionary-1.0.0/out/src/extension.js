"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const vscode = require('vscode');
const vscode_1 = require("vscode");
const _____1 = require("./\u6574\u6587\u4EF6\u7FFB\u8BD1");
const 查词 = require("./\u67E5\u8BCD");
function activate(context) {
    const 提供器 = new _____1.default();
    const 提供器注册 = vscode_1.Disposable.from(vscode_1.workspace.registerTextDocumentContentProvider(_____1.default.scheme, 提供器));
    const 命令注册 = vscode_1.commands.registerTextEditorCommand('editor.批量翻译标识符', 编辑器 => {
        const uri = _____1.encodeLocation(编辑器.document.uri, 编辑器.selection.active);
        return vscode_1.workspace.openTextDocument(uri).then(代码文件 => vscode_1.window.showTextDocument(代码文件, 编辑器.viewColumn + 1));
    });
    const 状态框 = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
    状态框.command = 'extension.翻译选中文本';
    context.subscriptions.push(提供器, 命令注册, 提供器注册, 状态框);
    context.subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(e => 更新状态栏(状态框)));
    context.subscriptions.push(vscode_1.window.onDidChangeTextEditorSelection(e => 更新状态栏(状态框)));
    context.subscriptions.push(vscode_1.window.onDidChangeTextEditorViewColumn(e => 更新状态栏(状态框)));
    context.subscriptions.push(vscode_1.workspace.onDidOpenTextDocument(e => 更新状态栏(状态框)));
    context.subscriptions.push(vscode_1.workspace.onDidCloseTextDocument(e => 更新状态栏(状态框)));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.翻译选中文本', () => {
        // TODO: 避免重复查询(状态框查询一次即可?)
        let 文本 = 取选中文本();
        if (文本) {
            let 显示 = 显示字段信息(查询词条(文本));
            vscode_1.window.showInformationMessage(显示词条(显示, 1000));
        }
    }));
    更新状态栏(状态框);
}
function 更新状态栏(状态框) {
    let 文本 = 取选中文本();
    if (文本) {
        状态框.text = "$(megaphone) " + 显示词条(显示简要信息(查询词条(文本)), 30);
        状态框.show();
    }
    else {
        状态框.hide();
    }
}
function 取选中文本() {
    const 当前编辑器 = vscode_1.window.activeTextEditor;
    if (当前编辑器) {
        const 选中部分 = 当前编辑器.selection;
        return 当前编辑器.document.getText(选中部分);
    }
}
function 查询词条(英文) {
    return 查词.取释义(英文);
}
function 显示词条(显示, 最大长度) {
    return 显示.length > 最大长度 ? 显示.substring(0, 最大长度 - 1) + "..." : 显示;
}
function 显示简要信息(查字段结果) {
    if (!查字段结果.释义) {
        return "查无结果: " + 查字段结果.原字段;
    }
    if (查字段结果.各词.length == 1) {
        return 取单词条信息(查字段结果.各词[0], false);
    }
    else {
        return 查字段结果.释义;
    }
}
function 显示字段信息(查字段结果) {
    // 长度必大于0
    if (查字段结果.各词.length == 1) {
        return 取单词条信息(查字段结果.各词[0], true);
    }
    else {
        let 翻译 = "";
        for (let 单词结果 of 查字段结果.各词) {
            翻译 += 取单词条信息(单词结果, true, false);
        }
        return 翻译;
    }
}
function 取单词条信息(查词结果, 显示原词 = false, 显示词形 = true) {
    let 显示 = 显示原词 ? "【" + 查词结果.词 + "】" : "";
    let 释义 = 查词结果.释义;
    if (释义) {
        显示 += " " + 释义.split('\\n').join(" ");
    }
    let 词形 = 查词结果.词形;
    if (显示词形 && 词形.length > 0) {
        let 词形显示 = "";
        for (let 某词形 of 词形) {
            词形显示 += 某词形.类型 + ": " + 某词形.变化 + "; ";
        }
        显示 += "  " + 词形显示;
    }
    return 显示;
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map