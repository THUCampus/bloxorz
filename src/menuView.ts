enum Page{Start, Help, Select, Game};

class MenuView {
    //UI
    public startPage: ui.start_viewUI;
    public logo: ui.logoUI;
    public selectList: myUI.SelectList;
    public selectList2: ui.select_listUI;
    public gameView: GameView;
    public gameBar: ui.game_barUI;
    public pause: ui.pause_dialogUI;
    //状态
    private pageState: Page;
    private currentLevel: number;
    public stepcount: number;

    constructor () {
        let res: Array<any> = [{url:"arrow_large_1.png",type:Laya.Loader.IMAGE},
                            {url:"arrow_large_2.png",type:Laya.Loader.IMAGE},
                            {url:"arrow_large_3.png",type:Laya.Loader.IMAGE},
                            {url:"arrow_large_4.png",type:Laya.Loader.IMAGE},
                            {url:"pause.png",type:Laya.Loader.IMAGE},
                            {url:"button.png",type:Laya.Loader.IMAGE},
                            {url:"btn_close.png",type:Laya.Loader.IMAGE},
                            {url:"sound/bgm.mp3",type:Laya.Loader.SOUND}];
        Laya.loader.load(res,Laya.Handler.create(this, this.loadUI), null);
    }

    loadUI () {
        //加载各个界面
        this.loadStartPage();
        this.loadLogo();
        this.loadHelp();
        this.loadSelect();
        this.loadGameBar();
        this.loadPause();
        //添加主界面
        this.pageState = Page.Start;
        this.addStartPage();
        //播放BGM
        this.playBGM();
    }

    /**加载各个界面 代码块开始 */
    loadStartPage () {
        //加载主界面
        this.startPage = new ui.start_viewUI();
        //绑定按钮监听函数
        this.startPage.upButton.on(Laya.Event.MOUSE_DOWN, this, this.upButtonClicked);
        this.startPage.downButton.on(Laya.Event.MOUSE_DOWN, this, this.downButtonCLicked);
        this.startPage.leftButton.on(Laya.Event.MOUSE_DOWN, this, this.leftButtonClicked);
        this.startPage.rightButton.on(Laya.Event.MOUSE_DOWN, this, this.rightButtonClicked);
    }
    loadLogo () {
        //加载主界面的logo
        this.logo = new ui.logoUI();
    }
    loadHelp () {
        //加载帮助界面
    }
    loadSelect () {
        //加载选择界面
        this.selectList = new myUI.SelectList(this);
    }
    loadGameBar () {
        //加载游戏顶部工具条
        this.gameBar = new ui.game_barUI();
        this.gameBar.pauseButton.on(Laya.Event.MOUSE_DOWN, this, this.addPause);
    }
    loadPause () {
        //加载暂停界面
        this.pause = new ui.pause_dialogUI();
        this.pause.backToGame.on(Laya.Event.MOUSE_DOWN, this, this.pauseToGame);
        this.pause.backToMain.on(Laya.Event.MOUSE_DOWN, this, this.pauseToStart);
    }
    updateSelect () {
        //重新加载选关信息
        //this.selectList.update();
    }
    playBGM () {
        Laya.SoundManager.playMusic("sound/bgm.mp3",0);
    }
    /**加载各个界面 代码块结束 */

    /**添加各个界面 代码块开始 */
    addStartPage () {
        Laya.stage.addChild(this.startPage);
        //添加3D画面
        this.addGame(0);
        //添加logo
        this.addLogo();
    }
    addLogo () {
        //添加主界面的logo
        Laya.stage.addChild(this.logo);
    }
    addHelp () {
        //添加帮助界面
    }
    addSelect () {
        //添加选择界面
        Laya.stage.addChild(this.selectList.selectListUI);
    }
    addGame (index: number) {
        //添加游戏界面
        this.gameView = new GameView(index, this);
    }
    addGameBar () {
        //加载游戏顶部工具条
        Laya.stage.addChild(this.gameBar);
    }
    addPause () {
        //加载暂停界面
        Laya.stage.addChild(this.pause);
    }
    /**添加各个界面 代码块结束 */

    /**移除各个界面 代码块开始 */
    removeLogo () {
        //移除logo
        Laya.stage.removeChild(this.logo);
    }
    removeHelp () {
        //移除帮助
        //Laya.stage.removeChild()
    }
    removeSelect () {
        //移除选关
        Laya.stage.removeChild(this.selectList.selectListUI);
        //Laya.stage.removeChild(this.selectList2);
    }
    removeGame () {
        //移除游戏界面
        this.gameView.clearView();
        delete this.gameView;
    }
    removeGameBar () {
        //移除游戏顶部工具条
        Laya.stage.removeChild(this.gameBar);
    }
    removePause () {
        //移除暂停界面
        Laya.stage.removeChild(this.pause);
    }
    /**移除各个界面 代码块结束 */

    /**界面跳转 代码块开始 */
    startToHelp () {
        this.removeLogo();
        this.pageState = Page.Help;
        this.addHelp();
    }
    helpToStart () {
        this.removeHelp();
        this.pageState = Page.Start;
        this.addLogo();
    }
    startToSelect () {
        this.removeLogo();
        this.pageState = Page.Select;
        this.addSelect();
    }
    selectToStart () {
        this.removeSelect();
        this.pageState = Page.Start;
        this.addLogo();
    }
    selectToGame (index: number) {
        this.removeSelect();
        this.pageState = Page.Game;
        this.addGameBar();
    }
    pauseToGame () {
        this.removePause();
    }
    pauseToStart () {
        this.removePause();
        this.removeGame();
        this.removeGameBar();
        this.pageState = Page.Start;
        this.addStartPage();
    }
    /**界面跳转 代码块结束 */

    /**按钮监听函数 代码块开始 */
    upButtonClicked () {
        this.gameView.addMessage(Operation.UP);
        switch (this.pageState) {
            case Page.Start:
                this.startToHelp();
            break;
            case Page.Help:
                this.helpToStart();
            break;
            case Page.Select:
                this.selectToStart();
            break;
            case Page.Game:
                this.stepcount += 1;
                this.setMovesCount();
            break;
            default:
                console.log("no such page");
            break;
        }
    }
    downButtonCLicked () {
        this.gameView.addMessage(Operation.DOWN);
        switch (this.pageState) {
            case Page.Start:
            break;
            case Page.Help:
                this.helpToStart();
            break;
            case Page.Select:
                this.selectToStart();
            break;
            case Page.Game:
                this.stepcount += 1;
                this.setMovesCount();
            break;
            default:
                console.log("no such page");
            break;
        }
    }
    leftButtonClicked () {
        this.gameView.addMessage(Operation.LEFT);
        switch (this.pageState) {
            case Page.Start:
            break;
            case Page.Help:
                this.helpToStart();
            break;
            case Page.Select:
                this.selectToStart();
            break;
            case Page.Game:
                this.stepcount += 1;
                this.setMovesCount();
            break;
            default:
                console.log("no such page");
            break;
        }
    }
    rightButtonClicked () {
        this.gameView.addMessage(Operation.RIGHT);
        switch (this.pageState) {
            case Page.Start:
                this.startToSelect();
            break;
            case Page.Help:
                this.helpToStart();
            break;
            case Page.Select:
                this.selectToGame(this.currentLevel);
            break;
            case Page.Game:
                this.stepcount += 1;
                this.setMovesCount();
            break;
            default:
                console.log("no such page");
            break;
        }
    }
    /**按钮监听函数 代码块结束 */

    public setCurrentLevel(index: number): void{
        this.currentLevel = index;
    }    
    public getCurrentLevel(): number{
        return this.currentLevel;
    }

    public setMovesCount(): void{
        this.gameBar.movesLabel.text = "步数: " + this.stepcount;
    }
}
