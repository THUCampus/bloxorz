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
    var test;
    (function (test) {
        var ListUI = /** @class */ (function (_super) {
            __extends(ListUI, _super);
            function ListUI() {
                return _super.call(this) || this;
            }
            ListUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.ListUI.uiView);
            };
            ListUI.uiView = { "type": "View", "props": { "width": 500, "mouseEnabled": true, "height": 600 }, "child": [{ "type": "List", "props": { "width": 500, "var": "list", "spaceY": 5, "repeatX": 1, "mouseEnabled": true, "height": 600, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 112, "name": "render", "height": 60 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 180, "var": "nickname", "valign": "middle", "text": "this is a list", "skin": "comp/label.png", "name": "nickname", "height": 60, "fontSize": 20, "font": "SimHei", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 30, "var": "rank", "valign": "middle", "text": "123", "name": "rank", "height": 60, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 400, "var": "score", "valign": "middle", "text": "999", "name": "score", "height": 60, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 110, "width": 60, "var": "avatar", "name": "avatar", "height": 60 } }] }] }] };
            return ListUI;
        }(View));
        test.ListUI = ListUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map