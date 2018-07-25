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
    var finish_dialogUI = /** @class */ (function (_super) {
        __extends(finish_dialogUI, _super);
        function finish_dialogUI() {
            return _super.call(this) || this;
        }
        finish_dialogUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.finish_dialogUI.uiView);
        };
        finish_dialogUI.uiView = { "type": "Dialog", "props": { "width": 600, "height": 600 }, "child": [{ "type": "TextArea", "props": { "width": 379, "text": "恭喜你过关了！", "height": 73, "fontSize": 50, "font": "Microsoft YaHei", "color": "#ffffff", "centerY": -200, "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "width": 150, "var": "nextlevel", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "下一关", "height": 50, "centerY": 50, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "restart", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "重玩本关", "height": 50, "centerY": 120, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "back", "stateNum": 3, "skin": "button.png", "mouseEnabled": true, "labelSize": 25, "labelFont": "SimHei", "labelAlign": "center", "label": "返回主菜单", "height": 50, "centerY": 190, "centerX": 0 } }] };
        return finish_dialogUI;
    }(Dialog));
    ui.finish_dialogUI = finish_dialogUI;
})(ui || (ui = {}));
(function (ui) {
    var game_barUI = /** @class */ (function (_super) {
        __extends(game_barUI, _super);
        function game_barUI() {
            return _super.call(this) || this;
        }
        game_barUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.game_barUI.uiView);
        };
        game_barUI.uiView = { "type": "Dialog", "props": { "width": 1334, "top": 0, "left": 0, "height": 300 }, "child": [{ "type": "Button", "props": { "width": 50, "var": "pauseButton", "top": 50, "skin": "pause.png", "left": 50, "height": 50 } }, { "type": "Label", "props": { "width": 300, "var": "movesLabel", "top": 10, "text": "步数", "left": 200, "height": 30, "fontSize": 30, "font": "Arial", "color": "#ffffff" } }, { "type": "Label", "props": { "width": 300, "var": "timeLabel", "top": 10, "text": "时间", "left": 600, "height": 30, "fontSize": 30, "font": "Arial", "color": "#ffffff" } }] };
        return game_barUI;
    }(Dialog));
    ui.game_barUI = game_barUI;
})(ui || (ui = {}));
(function (ui) {
    var logoUI = /** @class */ (function (_super) {
        __extends(logoUI, _super);
        function logoUI() {
            return _super.call(this) || this;
        }
        logoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.logoUI.uiView);
        };
        logoUI.uiView = { "type": "Dialog", "props": { "width": 894, "height": 360, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "width": 432, "skin": "logo.png", "height": 240, "centerY": 0, "centerX": 0 } }] };
        return logoUI;
    }(Dialog));
    ui.logoUI = logoUI;
})(ui || (ui = {}));
(function (ui) {
    var pause_dialogUI = /** @class */ (function (_super) {
        __extends(pause_dialogUI, _super);
        function pause_dialogUI() {
            return _super.call(this) || this;
        }
        pause_dialogUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.pause_dialogUI.uiView);
        };
        pause_dialogUI.uiView = { "type": "Dialog", "props": { "width": 400, "popupCenter": true, "height": 400, "centerY": 0, "centerX": 0 }, "child": [{ "type": "TextArea", "props": { "width": 210, "text": "游戏暂停", "height": 57, "fontSize": 50, "font": "SimHei", "editable": false, "color": "#ffffff", "centerY": -100, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "backToGame", "stateNum": 3, "skin": "button.png", "name": "close", "labelSize": 30, "labelFont": "SimHei", "labelAlign": "center", "label": "回到游戏", "height": 50, "centerY": 16, "centerX": 0 } }, { "type": "Button", "props": { "width": 150, "var": "backToMain", "stateNum": 3, "skin": "button.png", "labelSize": 25, "labelFont": "SimHei", "labelAlign": "center", "label": "返回主菜单", "height": 50, "centerY": 140, "centerX": 0 } }] };
        return pause_dialogUI;
    }(Dialog));
    ui.pause_dialogUI = pause_dialogUI;
})(ui || (ui = {}));
(function (ui) {
    var select_listUI = /** @class */ (function (_super) {
        __extends(select_listUI, _super);
        function select_listUI() {
            return _super.call(this) || this;
        }
        select_listUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.select_listUI.uiView);
        };
        select_listUI.uiView = { "type": "View", "props": { "width": 900, "height": 360, "centerX": 0, "bottom": 0 } };
        return select_listUI;
    }(View));
    ui.select_listUI = select_listUI;
})(ui || (ui = {}));
(function (ui) {
    var start_viewUI = /** @class */ (function (_super) {
        __extends(start_viewUI, _super);
        function start_viewUI() {
            return _super.call(this) || this;
        }
        start_viewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.start_viewUI.uiView);
        };
        start_viewUI.uiView = { "type": "View", "props": { "width": 1334, "name": "start", "height": 750 }, "child": [{ "type": "Button", "props": { "width": 120, "visible": true, "var": "leftButton", "stateNum": 2, "skin": "arrow_large_4.png", "rotation": 0, "mouseEnabled": true, "left": 50, "height": 120, "bottom": 20 } }, { "type": "Button", "props": { "width": 120, "var": "downButton", "stateNum": 2, "skin": "arrow_large_3.png", "rotation": 0, "right": 50, "mouseEnabled": true, "height": 120, "bottom": 20 } }, { "type": "Button", "props": { "width": 120, "visible": true, "var": "rightButton", "stateNum": 2, "skin": "arrow_large_1.png", "rotation": 0, "right": 50, "mouseEnabled": true, "height": 120, "bottom": 240 } }, { "type": "Button", "props": { "width": 120, "visible": true, "var": "upButton", "stateNum": 2, "skin": "arrow_large_2.png", "rotation": 0, "mouseEnabled": true, "left": 50, "height": 120, "bottom": 240 } }] };
        return start_viewUI;
    }(View));
    ui.start_viewUI = start_viewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map