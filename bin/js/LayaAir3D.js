// 程序入口
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //初始化引擎
        Laya3D.init(1334, 750, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        //开启统计信息
        Laya.Stat.show();
        var res = [{ url: "arrow.png", type: Laya.Loader.IMAGE }, { url: "pause.png", type: Laya.Loader.IMAGE }, { url: "button.png", type: Laya.Loader.IMAGE }];
        Laya.loader.load(res, Laya.Handler.create(this, this.loadui), null);
    }
    LayaAir3D.prototype.loadui = function () {
        this.startui = new ui.startUI();
        this.startui.startButton.on(Laya.Event.MOUSE_DOWN, this, function () { Laya.loader.load("res/" + "1" + ".json", Laya.Handler.create(this, this.loadgame), null, Laya.Loader.JSON); });
        //this.startui.helpButton.on(Laya.Event.MOUSE_DOWN,this,this.help);
        Laya.stage.addChild(this.startui);
    };
    LayaAir3D.prototype.loadgame = function () {
        this.gamelogic = new game("1");
        this.gameui = new ui.gameUI();
        this.gameui.upbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.UP]);
        this.gameui.downbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.DOWN]);
        this.gameui.leftbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.LEFT]);
        this.gameui.rightbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.RIGHT]);
        this.gameui.pausebutton.on(Laya.Event.MOUSE_DOWN, this, this.pause);
        Laya.stage.removeChild(this.startui);
        Laya.stage.addChild(this.gameui);
        this.currentGame = new GameView("res/map_0.json");
    };
    LayaAir3D.prototype.move = function (direction) {
        this.gamelogic.move(direction);
        console.log(this.currentGame.addMessage(direction));
    };
    LayaAir3D.prototype.pause = function () {
        this.pauseui = new ui.pauseUI();
        this.pauseui.backToMain.on(Laya.Event.MOUSE_DOWN, this, this.backtomain);
        this.pauseui.backToGame.on(Laya.Event.MOUSE_DOWN, this, function () { this.pauseui.close(); this.gameui.disabled = false; });
        this.pauseui.restart.on(Laya.Event.MOUSE_DOWN, this, this.restart);
        this.gameui.disabled = true;
        Laya.stage.addChild(this.pauseui);
    };
    LayaAir3D.prototype.restart = function () {
        this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.loader.clearRes("res/" + "1" + ".json");
        Laya.loader.load("res/" + "1" + ".json", Laya.Handler.create(this, this.loadgame), null, Laya.Loader.JSON);
    };
    LayaAir3D.prototype.backtomain = function () {
        this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.loader.clearRes("res/" + "1" + ".json");
        this.loadui();
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map