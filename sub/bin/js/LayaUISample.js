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
var test = ui.test.ListUI;
var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var TestUI = /** @class */ (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        var arr = [];
        for (var i = 0; i < 100; i++) {
            arr.push({ nickname: "item " + i, rank: i, score: i, avatar: "res/muban.png" });
        }
        //给list赋值更改list的显示
        _this.list.array = arr;
        return _this;
    }
    TestUI.prototype.onBtn2Click = function () {
        //list赋值，先获得一个数据源数组
        //还可以自定义list渲染方式，可以打开下面注释看一下效果
        //list.renderHandler = new Handler(this, onListRender);
    };
    TestUI.prototype.onListRender = function (item, index) {
        //自定义list的渲染方式
        var label = item.getChildByName("label");
        if (index % 2) {
            label.color = "#ff0000";
        }
        else {
            label.color = "#000000";
        }
    };
    return TestUI;
}(ui.test.ListUI));
var subArea = /** @class */ (function () {
    function subArea() {
        var res = [{ url: "res/muban.png", type: Laya.Loader.IMAGE }];
        Laya.loader.load(res, Laya.Handler.create(this, function () { this.scoreUI = new TestUI(); /*Laya.stage.addChild(subUI)*/ /*Laya.stage.addChild(subUI)*/ ; }), null);
    }
    subArea.prototype.init = function () {
        wx.getUserCloudStorage({ keyList: ['score'], success: function (res) {
                console.log("score exists", res);
            },
            fail: function (res) {
                console.log("no score", res);
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "score", value: '0' }],
                    success: function (res) {
                        console.log("setUserCloudStorage success init", res);
                    },
                    fail: function (res) {
                        console.log("setUserCloudStorage fail init", res);
                    },
                    complete: function (res) { }
                });
            },
            complete: function (res) { } });
    };
    subArea.prototype.setScore = function (score) {
        wx.setUserCloudStorage({
            KVDataList: [{ key: "score", value: score }],
            success: function (res) {
                console.log("setUserCloudStorage success", res);
            },
            fail: function (res) {
                console.log("setUserCloudStorage fail", res);
            },
            complete: function (res) { }
        });
    };
    subArea.prototype.show = function () {
        //this.getFriendScore();
        Laya.stage.addChild(this.scoreUI);
    };
    subArea.prototype.getFriendScore = function () {
        var temp;
        wx.getFriendCloudStorage({ keyList: ["score"], success: function (res) {
                console.log("getFriendCloudStorage success", res);
                temp = res.data;
            },
            fail: function (res) {
                console.log("getFriendCloudStorage fail", res);
            },
            complete: function (res) { } });
    };
    return subArea;
}());
//初始化微信小游戏
Laya.MiniAdpter.init(true, true);
//程序入口
Laya.init(500, 600);
Laya.stage.bgColor = null;
var sub = new subArea();
wx.onMessage(function (message) {
    console.log(message);
    switch (message.type) {
        case "init":
            sub.init();
            break;
        case "update":
            sub.setScore(message.score);
            break;
        case 'show':
            sub.show();
            break;
        default:
    }
});
//# sourceMappingURL=LayaUISample.js.map