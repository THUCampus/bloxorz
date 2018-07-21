var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var finishUI = /** @class */ (function (_super) {
        __extends(finishUI, _super);
        function finishUI() {
            return _super.call(this) || this;
        }
        finishUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.finishUI.uiView);
        };
        finishUI.uiView = { "type": "Dialog", "props": { "width": 600, "height": 600 }, "child": [{ "type": "TextArea", "props": { "width": 379, "text": "恭喜你过关了！", "height": 73, "fontSize": 50, "font": "Microsoft YaHei", "color": "#ffffff", "centerY": -200, "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "width": 150, "var": "nextlevel", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "下一关", "height": 50, "centerY": 50, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "restart", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "重玩本关", "height": 50, "centerY": 120, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "back", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 25, "labelFont": "SimHei", "labelAlign": "center", "label": "返回主菜单", "height": 50, "centerY": 190, "centerX": 0 } }] };
        return finishUI;
    }(Dialog));
    ui.finishUI = finishUI;
})(ui || (ui = {}));
(function (ui) {
    var gameUI = /** @class */ (function (_super) {
        __extends(gameUI, _super);
        function gameUI() {
            return _super.call(this) || this;
        }
        gameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.gameUI.uiView);
        };
        gameUI.uiView = { "type": "View", "props": { "width": 1334, "name": "game", "height": 750 }, "child": [{ "type": "Button", "props": { "width": 150, "visible": true, "var": "leftbutton", "stateNum": 2, "skin": "arrow.png", "right": 290, "mouseEnabled": true, "height": 85, "bottom": 165 } }, { "type": "Button", "props": { "width": 150, "var": "downbutton", "stateNum": 2, "skin": "arrow.png", "rotation": 270, "right": 150, "mouseEnabled": true, "height": 85, "bottom": -50 } }, { "type": "Button", "props": { "width": 150, "visible": true, "var": "rightbutton", "stateNum": 2, "skin": "arrow.png", "rotation": 180, "right": -80, "mouseEnabled": true, "height": 85, "bottom": 80 } }, { "type": "Button", "props": { "width": 150, "visible": true, "var": "upbutton", "stateNum": 2, "skin": "arrow.png", "rotation": 90, "right": 65, "mouseEnabled": true, "height": 85, "bottom": 300 } }, { "type": "Button", "props": { "width": 64, "var": "pausebutton", "top": 10, "stateNum": 1, "skin": "pause.png", "right": 10, "height": 64 } }, { "type": "TextArea", "props": { "width": 280, "var": "step", "top": 10, "text": "移动步数: 0", "left": 10, "height": 40, "fontSize": 30, "font": "SimHei", "color": "#ffffff" } }, { "type": "TextArea", "props": { "width": 280, "var": "time", "top": 50, "text": "游戏用时: 0s", "left": 10, "height": 40, "fontSize": 30, "font": "SimHei", "color": "#ffffff" } }] };
        return gameUI;
    }(View));
    ui.gameUI = gameUI;
})(ui || (ui = {}));
(function (ui) {
    var helpUI = /** @class */ (function (_super) {
        __extends(helpUI, _super);
        function helpUI() {
            return _super.call(this) || this;
        }
        helpUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.helpUI.uiView);
        };
        helpUI.uiView = { "type": "Dialog", "props": { "width": 400, "height": 600, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Button", "props": { "width": 30, "var": "closeButton", "top": 0, "stateNum": 3, "skin": "btn_close.png", "right": 0, "name": "close", "height": 30 } }] };
        return helpUI;
    }(Dialog));
    ui.helpUI = helpUI;
})(ui || (ui = {}));
(function (ui) {
    var pauseUI = /** @class */ (function (_super) {
        __extends(pauseUI, _super);
        function pauseUI() {
            return _super.call(this) || this;
        }
        pauseUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.pauseUI.uiView);
        };
        pauseUI.uiView = { "type": "Dialog", "props": { "width": 400, "popupCenter": true, "height": 400, "centerY": 0, "centerX": 0 }, "child": [{ "type": "TextArea", "props": { "width": 210, "text": "游戏暂停", "height": 57, "fontSize": 50, "font": "SimHei", "editable": false, "color": "#ffffff", "centerY": -100, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "backToGame", "stateNum": 3, "skin": "button.png", "name": "close", "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "回到游戏", "height": 50, "centerY": 0, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "backToMain", "stateNum": 3, "skin": "button.png", "labelSize": 25, "labelFont": "SimHei", "labelAlign": "center", "label": "返回主菜单", "height": 50, "centerY": 140, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "restart", "stateNum": 3, "skin": "button.png", "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "重玩本关", "height": 50, "centerY": 70, "centerX": 0 } }] };
        return pauseUI;
    }(Dialog));
    ui.pauseUI = pauseUI;
})(ui || (ui = {}));
(function (ui) {
    var selectUI = /** @class */ (function (_super) {
        __extends(selectUI, _super);
        function selectUI() {
            return _super.call(this) || this;
        }
        selectUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.selectUI.uiView);
        };
        selectUI.uiView = { "type": "Dialog", "props": { "width": 600, "height": 300, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Button", "props": { "width": 30, "var": "closeButton", "top": 0, "stateNum": 3, "skin": "btn_close.png", "right": 0, "name": "close", "height": 30 } }, { "type": "ComboBox", "props": { "width": 200, "var": "level", "skin": "combobox.png", "labels": "1,2,3", "labelSize": 30, "labelFont": "SimHei", "height": 50, "centerY": -50, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "select", "stateNum": 3, "skin": "button.png", "labelSize": 25, "labelFont": "SimHei", "label": "确定", "height": 50, "centerY": 50, "centerX": 0 } }] };
        return selectUI;
    }(Dialog));
    ui.selectUI = selectUI;
})(ui || (ui = {}));
(function (ui) {
    var startUI = /** @class */ (function (_super) {
        __extends(startUI, _super);
        function startUI() {
            return _super.call(this) || this;
        }
        startUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.startUI.uiView);
        };
        startUI.uiView = { "type": "View", "props": { "width": 1334, "name": "start", "height": 750 }, "child": [{ "type": "Button", "props": { "width": 200, "var": "startButton", "stateNum": 3, "skin": "button.png", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#000000", "labelStroke": 0, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "开始游戏", "height": 50, "centerY": 100, "centerX": -150 } }, { "type": "Button", "props": { "width": 200, "var": "helpButton", "stateNum": 3, "skin": "button.png", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#ffffff", "labelStroke": 0, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "游戏帮助", "height": 50, "centerY": 100, "centerX": 150 } }, { "type": "Image", "props": { "skin": "logo.png", "centerY": -100, "centerX": 0 } }] };
        return startUI;
    }(View));
    ui.startUI = startUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map