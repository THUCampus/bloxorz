
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class finish_dialogUI extends Dialog {
		public nextlevel:Laya.Button;
		public restart:Laya.Button;
		public back:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"height":600},"child":[{"type":"TextArea","props":{"width":379,"text":"恭喜你过关了！","height":73,"fontSize":50,"font":"Microsoft YaHei","color":"#ffffff","centerY":-200,"centerX":0,"align":"center"}},{"type":"Button","props":{"width":150,"var":"nextlevel","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"下一关","height":50,"centerY":50,"centerX":0}},{"type":"Button","props":{"width":150,"var":"restart","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"重玩本关","height":50,"centerY":120,"centerX":0}},{"type":"Button","props":{"width":150,"var":"back","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":25,"labelFont":"SimHei","labelAlign":"center","label":"返回主菜单","height":50,"centerY":190,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.finish_dialogUI.uiView);

        }

    }
}

module ui {
    export class game_barUI extends Dialog {
		public pauseButton:Laya.Button;
		public movesLabel:Laya.Label;
		public timeLabel:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":1334,"top":0,"left":0,"height":300},"child":[{"type":"Button","props":{"width":50,"var":"pauseButton","top":50,"skin":"pause.png","left":50,"height":50}},{"type":"Label","props":{"width":300,"var":"movesLabel","top":10,"text":"步数：","left":200,"height":30,"fontSize":30,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"width":300,"var":"timeLabel","top":10,"text":"时间：","left":600,"height":30,"fontSize":30,"font":"Arial","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game_barUI.uiView);

        }

    }
}

module ui {
    export class logoUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":894,"height":360,"centerX":0,"bottom":0},"child":[{"type":"Image","props":{"width":432,"skin":"logo.png","height":240,"centerY":0,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.logoUI.uiView);

        }

    }
}

module ui {
    export class pause_dialogUI extends Dialog {
		public backToGame:Laya.Button;
		public backToMain:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"popupCenter":true,"height":400,"centerY":0,"centerX":0},"child":[{"type":"TextArea","props":{"width":210,"text":"游戏暂停","height":57,"fontSize":50,"font":"SimHei","editable":false,"color":"#ffffff","centerY":-100,"centerX":0}},{"type":"Button","props":{"width":150,"var":"backToGame","stateNum":3,"skin":"button.png","name":"close","labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"回到游戏","height":50,"centerY":16,"centerX":0}},{"type":"Button","props":{"width":150,"var":"backToMain","stateNum":3,"skin":"button.png","labelSize":25,"labelFont":"SimHei","labelAlign":"center","label":"返回主菜单","height":50,"centerY":140,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pause_dialogUI.uiView);

        }

    }
}

module ui {
    export class select_listUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":900,"height":360,"centerX":0,"bottom":0}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.select_listUI.uiView);

        }

    }
}

module ui {
    export class start_viewUI extends View {
		public leftButton:Laya.Button;
		public downButton:Laya.Button;
		public rightButton:Laya.Button;
		public upButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"start","height":750},"child":[{"type":"Button","props":{"width":120,"visible":true,"var":"leftButton","stateNum":2,"skin":"arrow_large_4.png","rotation":45,"pivotY":60,"pivotX":59,"mouseEnabled":true,"left":50,"height":120,"bottom":20}},{"type":"Button","props":{"width":120,"var":"downButton","stateNum":2,"skin":"arrow_large_3.png","rotation":-45,"right":50,"pivotY":60,"pivotX":61,"mouseEnabled":true,"height":120,"bottom":20}},{"type":"Button","props":{"width":120,"visible":true,"var":"rightButton","stateNum":2,"skin":"arrow_large_1.png","rotation":-45,"right":50,"pivotY":60,"pivotX":59,"mouseEnabled":true,"height":120,"bottom":240}},{"type":"Button","props":{"width":120,"visible":true,"var":"upButton","stateNum":2,"skin":"arrow_large_2.png","rotation":45,"pivotY":59,"pivotX":60,"mouseEnabled":true,"left":50,"height":120,"bottom":240}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.start_viewUI.uiView);

        }

    }
}
