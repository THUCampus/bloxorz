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
        finishUI.uiView = { "type": "Dialog", "props": { "width": 800, "height": 600 } };
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
            this.leftbutton.on(Laya.Event.MOUSE_DOWN, this, this.lbhit);
            this.rightbutton.on(Laya.Event.MOUSE_DOWN, this, this.lbhit);
            this.upbutton.on(Laya.Event.MOUSE_DOWN, this, this.lbhit);
            this.downbutton.on(Laya.Event.MOUSE_DOWN, this, this.lbhit);
        };
        gameUI.prototype.lbhit = function () {
            console.log("lb");
        };
        gameUI.uiView = { "type": "View", "props": { "width": 1334, "name": "game", "height": 750 }, "child": [{ "type": "Button", "props": { "width": 150, "visible": true, "var": "leftbutton", "stateNum": 1, "skin": "arrow.png", "right": 290, "mouseEnabled": true, "height": 85, "bottom": 165 } }, { "type": "Button", "props": { "width": 150, "var": "downbutton", "stateNum": 1, "skin": "arrow.png", "rotation": 270, "right": 150, "mouseEnabled": true, "height": 85, "bottom": -50 } }, { "type": "Button", "props": { "width": 150, "visible": true, "var": "rightbutton", "stateNum": 1, "skin": "arrow.png", "rotation": 180, "right": -80, "mouseEnabled": true, "height": 85, "bottom": 80 } }, { "type": "Button", "props": { "width": 150, "visible": true, "var": "upbutton", "stateNum": 1, "skin": "arrow.png", "rotation": 90, "right": 65, "mouseEnabled": true, "height": 85, "bottom": 300 } }, { "type": "Button", "props": { "width": 64, "var": "pausebutton", "top": 10, "stateNum": 1, "skin": "pause.png", "right": 10, "height": 64 } }] };
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
        helpUI.uiView = { "type": "Dialog", "props": { "width": 800, "height": 600 } };
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
        pauseUI.uiView = { "type": "Dialog", "props": { "width": 500, "height": 300 } };
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
        selectUI.uiView = { "type": "Dialog", "props": { "width": 800, "height": 600 } };
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
        startUI.prototype.start = function () {
            console.log("st");
        };
        startUI.prototype.help = function () {
            console.log("lb");
        };
        startUI.uiView = { "type": "View", "props": { "width": 1334, "name": "start", "height": 750 }, "child": [{ "type": "Button", "props": { "width": 200, "var": "startButton", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#ffffff", "labelStroke": 0, "labelSize": 30, "labelAlign": "center", "label": "开始游戏", "height": 50, "centerY": 100, "centerX": -100, "blendMode": "lighter" } }, { "type": "Button", "props": { "width": 200, "var": "helpButton", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#ffffff", "labelStroke": 0, "labelSize": 30, "labelAlign": "center", "label": "游戏帮助", "height": 50, "centerY": 100, "centerX": 100, "blendMode": "lighter" } }, { "type": "Image", "props": { "skin": "logo.png", "centerY": -100, "centerX": 0 } }] };
        return startUI;
    }(View));
    ui.startUI = startUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map