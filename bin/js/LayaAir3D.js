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
        var res = [{ url: "arrow.png", type: Laya.Loader.IMAGE }, { url: "pause.png", type: Laya.Loader.IMAGE }, { url: "button.png", type: Laya.Loader.IMAGE }, { url: "btn_close.png", type: Laya.Loader.IMAGE }, { url: "combobox.png", type: Laya.Loader.IMAGE }];
        Laya.loader.load(res, Laya.Handler.create(this, this.loadui), null);
    }
    LayaAir3D.prototype.loadui = function () {
        this.startui = new ui.startUI();
        this.startui.startButton.on(Laya.Event.MOUSE_DOWN, this, this.selectlevel);
        this.startui.helpButton.on(Laya.Event.MOUSE_DOWN, this, this.help);
        Laya.stage.addChild(this.startui);
    };
    LayaAir3D.prototype.help = function () {
        this.helpui = new ui.helpUI();
        Laya.stage.addChild(this.helpui);
        this.startui.disabled = true;
        this.helpui.closeButton.on(Laya.Event.MOUSE_DOWN, this, function () { this.startui.disabled = false; this.helpui.close(); });
    };
    LayaAir3D.prototype.selectlevel = function () {
        this.selectui = new ui.selectUI();
        Laya.stage.addChild(this.selectui);
        this.startui.disabled = true;
        this.selectui.closeButton.on(Laya.Event.MOUSE_DOWN, this, function () { this.startui.disabled = false; this.selectui.close(); });
        this.selectui.select.on(Laya.Event.MOUSE_DOWN, this, function () {
            this.currentLevel = this.selectui.level.selectedLabel;
            Laya.loader.load("res/map_" + this.currentLevel + ".json", Laya.Handler.create(this, this.loadgame), null, Laya.Loader.JSON);
        });
    };
    LayaAir3D.prototype.loadgame = function () {
        this.gamelogic = new game(this.currentLevel);
        this.gameui = new ui.gameUI();
        this.gameui.upbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.UP]);
        this.gameui.downbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.DOWN]);
        this.gameui.leftbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.LEFT]);
        this.gameui.rightbutton.on(Laya.Event.MOUSE_DOWN, this, this.move, [Operation.RIGHT]);
        this.gameui.pausebutton.on(Laya.Event.MOUSE_DOWN, this, this.pause);
        Laya.stage.destroyChildren();
        Laya.stage.addChild(this.gameui);
        this.currentGame = new GameView("res/map_1.json");
        this.startTimer();
    };
    LayaAir3D.prototype.startTimer = function () {
        Laya.timer.loop(1000, this, function () {
            this.gamelogic.timecount++;
            this.gameui.time.text = "游戏用时: " + this.gamelogic.timecount + "s";
        });
    };
    LayaAir3D.prototype.move = function (direction) {
        this.currentGame.addMessage(direction);
        switch (this.gamelogic.move(direction)) {
            case State.FAILURE:
                console.log("lose!");
                break;
            case State.SUCCESS:
                console.log("win!");
                break;
        }
        this.gameui.step.text = "移动步数: " + this.gamelogic.stepcount;
    };
    LayaAir3D.prototype.pause = function () {
        Laya.timer.clearAll(this);
        this.pauseui = new ui.pauseUI();
        this.pauseui.backToMain.on(Laya.Event.MOUSE_DOWN, this, this.backtomain);
        this.pauseui.backToGame.on(Laya.Event.MOUSE_DOWN, this, function () { this.pauseui.close(); this.gameui.disabled = false; this.startTimer(); });
        this.pauseui.restart.on(Laya.Event.MOUSE_DOWN, this, this.restart);
        this.gameui.disabled = true;
        Laya.stage.addChild(this.pauseui);
    };
    LayaAir3D.prototype.restart = function () {
        //this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.timer.clearAll(this);
        Laya.loader.clearRes("res/map_" + this.currentLevel + ".json");
        Laya.loader.load("res/map_" + this.currentLevel + ".json", Laya.Handler.create(this, this.loadgame), null, Laya.Loader.JSON);
    };
    LayaAir3D.prototype.backtomain = function () {
        delete (this.currentGame);
        this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.timer.clearAll(this);
        Laya.loader.clearRes("res/map_" + this.currentLevel + ".json");
        this.loadui();
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map