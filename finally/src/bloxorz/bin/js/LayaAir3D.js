// 程序入口
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //初始化引擎
        Laya3D.init(1334, 750, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        //开启统计信息
        //Laya.Stat.show();
        var test = new MenuView();
    }
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map