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
        return _super.call(this) || this;
    }
    return TestUI;
}(ui.test.ListUI));
var subArea = /** @class */ (function () {
    function subArea() {
        var _this = this;
        this.setScore = function (score) {
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
        this.setRankList = function (res) {
            console.log("getFriendCloudStorage success", res);
            var friendData = res.data;
            console.log(friendData);
            for (var i = 0; i < friendData.length; i++) {
                //清除错误数据
                if (friendData[i].KVDataList.length === 0 || (friendData[i].KVDataList.length === 1 && (parseInt(friendData[i].KVDataList[0].value) < 0 || parseInt(friendData[i].KVDataList[0].value) > 23 * 3))) {
                    friendData.splice(i, 1);
                    i--;
                }
            }
            console.log(friendData);
            friendData.sort(function (a, b) { return parseInt(b.KVDataList[0].value) - parseInt(a.KVDataList[0].value); });
            console.log(friendData);
            var arr = [];
            for (var i = 0; i < friendData.length; i++) {
                arr.push({ nickname: friendData[i].nickname, rank: i + 1, score: friendData[i].KVDataList[0].value, avatar: friendData[i].avatarUrl });
            }
            _this.scoreUI.list.array = arr;
            Laya.stage.addChild(_this.scoreUI);
        };
        this.scoreUI = new TestUI();
        this.curIndex = 0;
    }
    subArea.prototype.init = function () {
        var _this = this;
        wx.getUserCloudStorage({ keyList: ['score'],
            success: function (res) {
                console.log("score exists", res);
                if (res.KVDataList.length === 0 || (res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < 0 || parseInt(res.KVDataList[0].value) > 23 * 3)))
                    _this.setScore.apply(_this, ['0']);
            },
            fail: function (res) {
                console.log("no score", res);
                _this.setScore.apply(_this, ['0']);
            },
            complete: function (res) { } });
    };
    subArea.prototype.compare = function (score) {
        var _this = this;
        wx.getUserCloudStorage({ keyList: ['score'],
            success: function (res) {
                console.log("score exists", res);
                if (res.KVDataList.length === 0 || (res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < 0 || parseInt(res.KVDataList[0].value) > 23 * 3)))
                    _this.setScore.apply(_this, [score]);
                else if (res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < parseInt(score)))
                    _this.setScore.apply(_this, [score]);
            },
            fail: function (res) {
                console.log("no score", res);
                _this.setScore.apply(_this, [score]);
            },
            complete: function (res) { } });
    };
    subArea.prototype.show = function () {
        var _this = this;
        this.scoreUI.list.scrollTo(0);
        this.curIndex = 0;
        Laya.stage.removeChildren();
        wx.getFriendCloudStorage({ keyList: ["score"], success: function (res) { _this.setRankList.apply(_this, [res]); },
            fail: function (res) {
                console.log("getFriendCloudStorage fail", res);
            },
            complete: function (res) { } });
    };
    subArea.prototype.move = function (pos) {
        var i = Math.floor(Math.abs(pos) / 50);
        if (pos > 0) {
            if (this.curIndex + i < this.scoreUI.list.length)
                this.curIndex += i;
            else
                this.curIndex = this.scoreUI.list.length - 1;
        }
        else {
            if (this.curIndex - i >= 0)
                this.curIndex -= i;
            else
                this.curIndex = 0;
        }
        this.scoreUI.list.tweenTo(this.curIndex, 100 * i);
    };
    return subArea;
}());
//初始化微信小游戏
Laya.MiniAdpter.init(true, true);
//程序入口
Laya.init(600, 700);
var sub = new subArea();
wx.onMessage(function (message) {
    console.log(message);
    switch (message.type) {
        case "init":
            sub.init();
            break;
        case "update":
            sub.compare(message.score);
            break;
        case 'show':
            sub.show();
            break;
        case 'move':
            sub.move(message.pos);
            break;
        default:
    }
});
//# sourceMappingURL=LayaUISample.js.map