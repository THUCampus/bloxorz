var Page;
(function (Page) {
    Page[Page["Start"] = 0] = "Start";
    Page[Page["Help"] = 1] = "Help";
    Page[Page["Select"] = 2] = "Select";
    Page[Page["Game"] = 3] = "Game";
})(Page || (Page = {}));
;
var MenuView = /** @class */ (function () {
    function MenuView() {
        var _this = this;
        //helpAni
        this.helpAniPath = wx.env.USER_DATA_PATH + "/helplist.json";
        this.loadHelp = function () {
            //加载帮助界面
            _this.helpAni = new Laya.Animation();
            _this.helpAni.loadAtlas(_this.helpAniPath);
            _this.helpAni.interval = 200; //间隔 单位 毫秒
            var bounds = _this.helpAni.getGraphicBounds();
            _this.helpAni.pivot(bounds.width / 2, bounds.height / 2);
            _this.helpAni.pos(Laya.stage.width / 2, Laya.stage.height * 3 / 4);
        };
        var res = [{ url: "arrow_large_1.png", type: Laya.Loader.IMAGE },
            { url: "arrow_large_2.png", type: Laya.Loader.IMAGE },
            { url: "arrow_large_3.png", type: Laya.Loader.IMAGE },
            { url: "arrow_large_4.png", type: Laya.Loader.IMAGE },
            { url: "pause.png", type: Laya.Loader.IMAGE },
            { url: "button.png", type: Laya.Loader.IMAGE },
            { url: "btn_close.png", type: Laya.Loader.IMAGE }];
        this.login();
        Laya.loader.load(res, Laya.Handler.create(this, this.loadUI), null);
    }
    MenuView.prototype.login = function () {
        wx.getOpenDataContext().postMessage({ type: 'init' });
    };
    MenuView.prototype.loadUI = function () {
        //加载各个界面
        this.loadStartPage();
        this.loadLogo();
        this.downloadHelp();
        this.loadGameBar();
        this.loadPause();
        this.loadRankList();
        //添加主界面
        this.pageState = Page.Start;
        this.addStartPage();
        this.loadSelect();
        //播放BGM
        this.playBGM();
    };
    /**加载各个界面 代码块开始 */
    MenuView.prototype.loadStartPage = function () {
        //加载主界面
        this.startPage = new ui.start_viewUI();
        //绑定按钮监听函数
        this.startPage.upButton.on(Laya.Event.MOUSE_DOWN, this, this.upButtonClicked);
        this.startPage.downButton.on(Laya.Event.MOUSE_DOWN, this, this.downButtonCLicked);
        this.startPage.leftButton.on(Laya.Event.MOUSE_DOWN, this, this.leftButtonClicked);
        this.startPage.rightButton.on(Laya.Event.MOUSE_DOWN, this, this.rightButtonClicked);
        this.startPage.ranklistButton.on(Laya.Event.MOUSE_DOWN, this, this.switchRankList);
    };
    MenuView.prototype.loadLogo = function () {
        //加载主界面的logo
        this.logo = new ui.logoUI();
    };
    MenuView.prototype.downloadHelp = function () {
        var _this = this;
        this.helpAni = null;
        //加载帮助资源
        wx.downloadFile({ url: "https://zhao-zh16.iterator-traits.com/helplist.json", success: function (res) {
                console.log("helplist.json loaded", res);
                console.log(wx.getFileSystemManager().saveFileSync(res.tempFilePath, wx.env.USER_DATA_PATH + "/helplist.json"));
            }, fail: function (res) { console.log("helplist.json fail", res); }, complete: function () { } });
        wx.downloadFile({ url: "https://zhao-zh16.iterator-traits.com/helplist.png", success: function (res) {
                console.log("helplist.png loaded", res);
                console.log(wx.getFileSystemManager().saveFileSync(res.tempFilePath, wx.env.USER_DATA_PATH + "/helplist.png"));
                Laya.loader.load(_this.helpAniPath, Laya.Handler.create(_this, _this.loadHelp), null, Laya.Loader.ATLAS);
            }, fail: function (res) { console.log("helplist.png fail", res); }, complete: function () { } });
    };
    MenuView.prototype.loadSelect = function () {
        //加载选择界面
        this.selectList = new myUI.SelectList(this, this.gameView);
    };
    MenuView.prototype.loadGameBar = function () {
        //加载游戏顶部工具条
        this.gameBar = new ui.game_barUI();
        this.gameBar.pauseButton.on(Laya.Event.MOUSE_DOWN, this, this.addPause);
    };
    MenuView.prototype.loadPause = function () {
        //加载暂停界面
        this.pause = new ui.pause_dialogUI();
        this.pause.backToGame.on(Laya.Event.MOUSE_DOWN, this, this.pauseToGame);
        this.pause.backToMain.on(Laya.Event.MOUSE_DOWN, this, this.pauseToStart);
    };
    MenuView.prototype.loadRankList = function () {
        this.ranklist = new view.rankList();
    };
    MenuView.prototype.switchRankList = function () {
        //切换排行榜界面显示状态
        if (this.ranklist.state) {
            Laya.stage.removeChild(this.ranklist);
            this.ranklist.state = false;
        }
        else {
            this.ranklist.draw();
            Laya.stage.addChild(this.ranklist);
            this.ranklist.state = true;
        }
    };
    MenuView.prototype.updateSelect = function () {
        //重新加载选关信息
        this.selectList.update();
    };
    MenuView.prototype.playBGM = function () {
        Laya.SoundManager.playMusic("https://zhao-zh16.iterator-traits.com/bgm.mp3", 1);
    };
    /**加载各个界面 代码块结束 */
    /**添加各个界面 代码块开始 */
    MenuView.prototype.addStartPage = function () {
        Laya.stage.addChild(this.startPage);
        //添加3D画面
        this.addGame(0);
        //添加logo
        this.addLogo();
    };
    MenuView.prototype.addLogo = function () {
        //添加主界面的logo
        Laya.stage.addChild(this.logo);
    };
    MenuView.prototype.addHelp = function () {
        //添加帮助界面
        if (this.helpAni !== null) {
            this.helpAni.index = 1;
            this.helpAni.play();
            Laya.stage.addChild(this.helpAni);
        }
    };
    MenuView.prototype.addSelect = function () {
        //添加选择界面
        this.selectList.update();
        Laya.stage.addChild(this.selectList.selectListUI);
    };
    MenuView.prototype.addGame = function (index) {
        //添加游戏界面
        this.gameView = new GameView(index, this);
    };
    MenuView.prototype.addGameBar = function () {
        //加载游戏顶部工具条
        Laya.stage.addChild(this.gameBar);
    };
    MenuView.prototype.addPause = function () {
        //加载暂停界面
        Laya.stage.addChild(this.pause);
    };
    /**添加各个界面 代码块结束 */
    /**移除各个界面 代码块开始 */
    MenuView.prototype.removeLogo = function () {
        //移除logo
        Laya.stage.removeChild(this.logo);
    };
    MenuView.prototype.removeHelp = function () {
        //移除帮助
        Laya.stage.removeChild(this.helpAni);
    };
    MenuView.prototype.removeSelect = function () {
        //移除选关
        Laya.stage.removeChild(this.selectList.selectListUI);
    };
    MenuView.prototype.removeGame = function () {
        //移除游戏界面
        this.gameView.clearView();
        delete this.gameView;
    };
    MenuView.prototype.removeGameBar = function () {
        //移除游戏顶部工具条
        Laya.stage.removeChild(this.gameBar);
    };
    MenuView.prototype.removePause = function () {
        //移除暂停界面
        Laya.stage.removeChild(this.pause);
    };
    /**移除各个界面 代码块结束 */
    /**界面跳转 代码块开始 */
    MenuView.prototype.startToHelp = function () {
        this.removeLogo();
        this.pageState = Page.Help;
        this.addHelp();
    };
    MenuView.prototype.helpToStart = function () {
        this.removeHelp();
        this.pageState = Page.Start;
        this.addLogo();
    };
    MenuView.prototype.startToSelect = function () {
        this.removeLogo();
        this.pageState = Page.Select;
        this.addSelect();
    };
    MenuView.prototype.selectToStart = function () {
        this.removeSelect();
        this.pageState = Page.Start;
        this.addLogo();
    };
    MenuView.prototype.selectToGame = function (index) {
        this.removeSelect();
        this.pageState = Page.Game;
        this.addGameBar();
    };
    MenuView.prototype.pauseToGame = function () {
        this.removePause();
    };
    MenuView.prototype.pauseToStart = function () {
        this.removePause();
        this.removeGame();
        this.removeGameBar();
        this.pageState = Page.Start;
        this.addStartPage();
    };
    /**界面跳转 代码块结束 */
    /**按钮监听函数 代码块开始 */
    MenuView.prototype.upButtonClicked = function () {
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
    };
    MenuView.prototype.downButtonCLicked = function () {
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
    };
    MenuView.prototype.leftButtonClicked = function () {
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
    };
    MenuView.prototype.rightButtonClicked = function () {
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
    };
    /**按钮监听函数 代码块结束 */
    MenuView.prototype.setCurrentLevel = function (index) {
        this.currentLevel = index;
    };
    MenuView.prototype.getCurrentLevel = function () {
        return this.currentLevel;
    };
    MenuView.prototype.setMovesCount = function () {
        this.gameBar.movesLabel.text = "步数: " + this.stepcount;
    };
    return MenuView;
}());
//# sourceMappingURL=menuView.js.map