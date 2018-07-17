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
    var startUI = /** @class */ (function (_super) {
        __extends(startUI, _super);
        function startUI() {
            return _super.call(this) || this;
        }
        startUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.startUI.uiView);
        };
        startUI.uiView = { "type": "View", "props": { "width": 1334, "name": "start", "height": 750 }, "child": [{ "type": "Button", "props": { "y": 471, "x": 414, "width": 200, "var": "startButton", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#ffffff", "labelStroke": 0, "labelSize": 30, "label": "开始游戏", "height": 50 } }, { "type": "Button", "props": { "y": 473, "x": 741, "width": 200, "var": "helpButton", "rotation": 0, "mouseEnabled": true, "labelStrokeColor": "#ffffff", "labelStroke": 0, "labelSize": 30, "label": "游戏帮助", "height": 50 } }, { "type": "Image", "props": { "y": 147, "x": 392, "skin": "Bloxorz_副本.png", "cacheAs": "normal" } }] };
        return startUI;
    }(View));
    ui.startUI = startUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map