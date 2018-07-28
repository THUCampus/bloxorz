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
var myUI;
(function (myUI) {
    var SelectList = /** @class */ (function () {
        function SelectList(parent) {
            this.parent = parent;
            this.selectListUI = new ui.select_listUI();
            this.list = new Laya.List();
            this.selectListUI.addChild(this.list);
            this.list.itemRender = Item;
            this.list.repeatX = 5;
            this.list.repeatY = 2;
            this.list.vScrollBarSkin = "";
            this.list.selectEnable = true;
            this.list.selectHandler = new Laya.Handler(this, this.onSelect);
            this.list.renderHandler = new Laya.Handler(this, this.upDateItem);
            this.levels_file = 'res/levels.json';
            var res = [{ url: this.levels_file, type: Laya.Loader.JSON }];
            Laya.loader.load(res, Laya.Handler.create(this, this.update), null);
        }
        SelectList.prototype.update = function () {
            this.levels = Laya.loader.getRes(this.levels_file);
            var defaultExist = false;
            var data = [];
            var i;
            for (i = 1; i < this.levels['total_level']; i++) {
                if (!defaultExist && this.levels['levels'][i] === -1) {
                    defaultExist = true;
                    this.parent.setCurrentLevel(i - 1);
                }
                data.push([i, this.levels['levels'][i]]);
            }
            this.list.array = data;
            if (!defaultExist) {
                this.parent.setCurrentLevel(i - 1);
            }
        };
        SelectList.prototype.upDateItem = function (cell, index) {
            if (index === this.parent.getCurrentLevel() - 1) {
                cell.setImg(cell.dataSource, true);
            }
            else {
                cell.setImg(cell.dataSource, false);
            }
        };
        SelectList.prototype.onSelect = function (index) {
            index++;
            if (this.levels['levels'][index] === -1) {
                return;
            }
            this.parent.setCurrentLevel(index);
        };
        return SelectList;
    }());
    myUI.SelectList = SelectList;
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        function Item() {
            var _this = _super.call(this) || this;
            _this.size(Item.WID, Item.HEI);
            _this.img_n1 = new Laya.Image();
            _this.img_n1.x = Item.WID / 2 - Item.NUMBER_WID;
            _this.img_n1.size(Item.NUMBER_WID, Item.NUMBER_HEI);
            _this.addChild(_this.img_n1);
            _this.img_n2 = new Laya.Image();
            _this.img_n2.x = Item.WID / 2;
            _this.img_n2.size(Item.NUMBER_WID, Item.NUMBER_HEI);
            _this.addChild(_this.img_n2);
            _this.img_s = new Array();
            var x_0 = (Item.WID - Item.STAR_NUM * Item.STAR_WID) / 2;
            for (var i = 0; i < Item.STAR_NUM; i++) {
                var newImage = new Laya.Image();
                newImage.x = x_0 + i * Item.STAR_WID;
                newImage.y = Item.NUMBER_HEI;
                newImage.size(Item.STAR_WID, Item.STAR_HEI);
                _this.img_s.push(newImage);
                _this.addChild(_this.img_s[i]);
            }
            _this.img_c = new Laya.Image();
            _this.img_c.x = (Item.WID - Item.CURSOR_WID) / 2;
            _this.img_c.size(Item.CURSOR_WID, Item.CURSOR_HEI);
            _this.addChild(_this.img_c);
            return _this;
        }
        Item.prototype.setImg = function (index, iscurrentLevel) {
            this.img_n1.skin = this.indexToString_num(Math.floor(index[0] / 10));
            this.img_n2.skin = this.indexToString_num(index[0] % 10);
            if (index[1] === -1) {
                this.img_s[Math.floor(Item.STAR_NUM / 2)].skin = 'itemres/locked.png';
            }
            else {
                var i = 0;
                for (i = 0; i < index[1]; i++) {
                    this.img_s[i].skin = this.indexToString_star(1);
                }
                for (i; i < Item.STAR_NUM; i++) {
                    this.img_s[i].skin = this.indexToString_star(0);
                }
            }
            if (iscurrentLevel) {
                this.img_c.skin = 'itemres/cursor.png';
            }
            else {
                this.img_c.skin = null;
            }
        };
        Item.prototype.indexToString_num = function (index) {
            return 'itemres/number_' + index.toString() + '.png';
        };
        Item.prototype.indexToString_star = function (index) {
            return 'itemres/star_' + index.toString() + '.png';
        };
        Item.WID = 180;
        Item.HEI = 180;
        Item.NUMBER_WID = 60;
        Item.NUMBER_HEI = 100;
        Item.STAR_WID = 30;
        Item.STAR_HEI = 30;
        Item.STAR_NUM = 3;
        Item.CURSOR_WID = 140;
        Item.CURSOR_HEI = 140;
        return Item;
    }(Laya.Box));
})(myUI || (myUI = {}));
//# sourceMappingURL=selectList.js.map