// 程序入口
var LayaAir3D = /** @class */ (function () {
    /*
            public startui: ui.start_viewUI;
            public helpui: ui.help_listUI;
            public selectui: ui.select_viewUI;
            public gameui: ui.game_viewUI;
            public pauseui: ui.pause_dialogUI;
            public finishui: ui.finishUI;
            public gamelogic: game;
            public currentLevel: string;
            public currentGame: GameView;
    */
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
        var test = new MenuView();
        /*
                let res: Array<any> = [{url:"arrow_large_1.png",type:Laya.Loader.IMAGE},
                                    {url:"arrow_large_2.png",type:Laya.Loader.IMAGE},
                                    {url:"arrow_large_3.png",type:Laya.Loader.IMAGE},
                                    {url:"arrow_large_4.png",type:Laya.Loader.IMAGE},
                                    {url:"pause.png",type:Laya.Loader.IMAGE},
                                    {url:"button.png",type:Laya.Loader.IMAGE},
                                    {url:"btn_close.png",type:Laya.Loader.IMAGE},
                                    {url:"combobox.png",type:Laya.Loader.IMAGE}];
                Laya.loader.load(res,Laya.Handler.create(this, this.loadui), null)
        */
    }
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map