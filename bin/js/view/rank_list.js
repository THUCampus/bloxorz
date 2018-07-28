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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var rankList = /** @class */ (function (_super) {
        __extends(rankList, _super);
        function rankList() {
            var _this = _super.call(this) || this;
            _this.sharedCanvas = null;
            return _this;
        }
        rankList.prototype.draw = function () {
            wx.getOpenDataContext().postMessage({ type: "show" });
            console.log("draw");
            this.graphics.clear();
            if (null === this.sharedCanvas) {
                this.sharedCanvas = wx.getOpenDataContext().canvas;
                this.subTex = new Laya.Texture(this.sharedCanvas);
            }
            if (null != this.sharedCanvas) {
                this.subTex.bitmap.alwaysChange = true;
                this.graphics.drawTexture(this.subTex, 50, 50, 500, 600);
            }
        };
        return rankList;
    }(ui.rank_listUI));
    view.rankList = rankList;
})(view || (view = {}));
//# sourceMappingURL=rank_list.js.map