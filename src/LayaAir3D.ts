// 程序入口
class LayaAir3D {
        public startui: ui.startUI;
        public gameui: ui.gameUI;
        public pauseui: ui.pauseUI;
        public finishui: ui.finishUI;
        public gamelogic: game;
        public currentGame: GameView;
    constructor() {
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
        let res: Array<any> = [{url:"arrow.png",type:Laya.Loader.IMAGE},{url:"pause.png",type:Laya.Loader.IMAGE},{url:"button.png",type:Laya.Loader.IMAGE}];
        Laya.loader.load(res,Laya.Handler.create(this, this.loadui), null)
    }
    loadui()
    {
        this.startui = new ui.startUI();
        this.startui.startButton.on(Laya.Event.MOUSE_DOWN,this,function(){Laya.loader.load("res/" + "1" + ".json", Laya.Handler.create(this,this.loadgame), null, Laya.Loader.JSON);});
        //this.startui.helpButton.on(Laya.Event.MOUSE_DOWN,this,this.help);
        Laya.stage.addChild(this.startui);
    }
    loadgame()
    {
        this.gamelogic = new game("1");
        this.gameui = new ui.gameUI();
        this.gameui.upbutton.on(Laya.Event.MOUSE_DOWN,this,this.move,[Operation.UP]);
        this.gameui.downbutton.on(Laya.Event.MOUSE_DOWN,this,this.move,[Operation.DOWN]);
        this.gameui.leftbutton.on(Laya.Event.MOUSE_DOWN,this,this.move,[Operation.LEFT]);
        this.gameui.rightbutton.on(Laya.Event.MOUSE_DOWN,this,this.move,[Operation.RIGHT]);
        this.gameui.pausebutton.on(Laya.Event.MOUSE_DOWN,this,this.pause);
        Laya.stage.removeChild(this.startui);
        Laya.stage.addChild(this.gameui);
        this.currentGame = new GameView("res/map_0.json");
    }
    move(direction: Operation)
    {
        this.currentGame.addMessage(direction);
        switch(this.gamelogic.move(direction))
        {
            case State.FAILURE:
            this.restart();
            break;
            case State.SUCCESS:
            console.log("win!");
            break;
        }
    }
    pause()
    {
        this.pauseui = new ui.pauseUI();
        this.pauseui.backToMain.on(Laya.Event.MOUSE_DOWN,this,this.backtomain);
        this.pauseui.backToGame.on(Laya.Event.MOUSE_DOWN,this,function(){this.pauseui.close(); this.gameui.disabled = false;});
        this.pauseui.restart.on(Laya.Event.MOUSE_DOWN,this,this.restart);
        this.gameui.disabled = true;
        Laya.stage.addChild(this.pauseui);
    }
    restart()
    {
        this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.loader.clearRes("res/" + "1" + ".json");
        Laya.loader.load("res/" + "1" + ".json", Laya.Handler.create(this,this.loadgame), null, Laya.Loader.JSON);
    }
    backtomain()
    {
        this.pauseui.close();
        Laya.stage.destroyChildren();
        Laya.loader.clearRes("res/" + "1" + ".json");
        this.loadui();
    }
}

new LayaAir3D();





