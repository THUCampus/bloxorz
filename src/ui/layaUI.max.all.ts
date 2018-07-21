
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class finishUI extends Dialog {
		public nextlevel:Laya.Button;
		public restart:Laya.Button;
		public back:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"height":600},"child":[{"type":"TextArea","props":{"width":379,"text":"恭喜你过关了！","height":73,"fontSize":50,"font":"Microsoft YaHei","color":"#ffffff","centerY":-200,"centerX":0,"align":"center"}},{"type":"Button","props":{"width":150,"var":"nextlevel","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"下一关","height":50,"centerY":50,"centerX":0}},{"type":"Button","props":{"width":150,"var":"restart","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"重玩本关","height":50,"centerY":120,"centerX":0}},{"type":"Button","props":{"width":150,"var":"back","stateNum":3,"skin":"button.png","mouseEnabled":true,"labelSize":25,"labelFont":"SimHei","labelAlign":"center","label":"返回主菜单","height":50,"centerY":190,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.finishUI.uiView);

        }

    }
}

module ui {
    export class gameUI extends View {
		public leftbutton:Laya.Button;
		public downbutton:Laya.Button;
		public rightbutton:Laya.Button;
		public upbutton:Laya.Button;
		public pausebutton:Laya.Button;
		public step:Laya.TextArea;
		public time:Laya.TextArea;

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"game","height":750},"child":[{"type":"Button","props":{"width":150,"visible":true,"var":"leftbutton","stateNum":2,"skin":"arrow.png","right":290,"mouseEnabled":true,"height":85,"bottom":165}},{"type":"Button","props":{"width":150,"var":"downbutton","stateNum":2,"skin":"arrow.png","rotation":270,"right":150,"mouseEnabled":true,"height":85,"bottom":-50}},{"type":"Button","props":{"width":150,"visible":true,"var":"rightbutton","stateNum":2,"skin":"arrow.png","rotation":180,"right":-80,"mouseEnabled":true,"height":85,"bottom":80}},{"type":"Button","props":{"width":150,"visible":true,"var":"upbutton","stateNum":2,"skin":"arrow.png","rotation":90,"right":65,"mouseEnabled":true,"height":85,"bottom":300}},{"type":"Button","props":{"width":64,"var":"pausebutton","top":10,"stateNum":1,"skin":"pause.png","right":10,"height":64}},{"type":"TextArea","props":{"width":280,"var":"step","top":10,"text":"移动步数: 0","left":10,"height":40,"fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"TextArea","props":{"width":280,"var":"time","top":50,"text":"游戏用时: 0s","left":10,"height":40,"fontSize":30,"font":"SimHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.uiView);

        }

    }
}

module ui {
    export class helpUI extends Dialog {
		public closeButton:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"height":600,"centerY":0,"centerX":0},"child":[{"type":"Button","props":{"width":30,"var":"closeButton","top":0,"stateNum":3,"skin":"btn_close.png","right":0,"name":"close","height":30}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.helpUI.uiView);

        }

    }
}

module ui {
    export class pauseUI extends Dialog {
		public backToGame:Laya.Button;
		public backToMain:Laya.Button;
		public restart:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"popupCenter":true,"height":400,"centerY":0,"centerX":0},"child":[{"type":"TextArea","props":{"width":210,"text":"游戏暂停","height":57,"fontSize":50,"font":"SimHei","editable":false,"color":"#ffffff","centerY":-100,"centerX":0}},{"type":"Button","props":{"width":150,"var":"backToGame","stateNum":3,"skin":"button.png","name":"close","labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"回到游戏","height":50,"centerY":0,"centerX":0}},{"type":"Button","props":{"width":150,"var":"backToMain","stateNum":3,"skin":"button.png","labelSize":25,"labelFont":"SimHei","labelAlign":"center","label":"返回主菜单","height":50,"centerY":140,"centerX":0}},{"type":"Button","props":{"width":150,"var":"restart","stateNum":3,"skin":"button.png","labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"重玩本关","height":50,"centerY":70,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pauseUI.uiView);

        }

    }
}

module ui {
    export class selectUI extends Dialog {
		public closeButton:Laya.Button;
		public level:Laya.ComboBox;
		public select:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"height":300,"centerY":0,"centerX":0},"child":[{"type":"Button","props":{"width":30,"var":"closeButton","top":0,"stateNum":3,"skin":"btn_close.png","right":0,"name":"close","height":30}},{"type":"ComboBox","props":{"width":200,"var":"level","skin":"combobox.png","labels":"1,2,3","labelSize":30,"labelFont":"SimHei","height":50,"centerY":-50,"centerX":0}},{"type":"Button","props":{"width":150,"var":"select","stateNum":3,"skin":"button.png","labelSize":25,"labelFont":"SimHei","label":"确定","height":50,"centerY":50,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.selectUI.uiView);

        }

    }
}

module ui {
    export class startUI extends View {
		public startButton:Laya.Button;
		public helpButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"start","height":750},"child":[{"type":"Button","props":{"width":200,"var":"startButton","stateNum":3,"skin":"button.png","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#000000","labelStroke":0,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"开始游戏","height":50,"centerY":100,"centerX":-150}},{"type":"Button","props":{"width":200,"var":"helpButton","stateNum":3,"skin":"button.png","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelStroke":0,"labelSize":30,"labelFont":"SimHei","labelAlign":"center","label":"游戏帮助","height":50,"centerY":100,"centerX":150}},{"type":"Image","props":{"skin":"logo.png","centerY":-100,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.startUI.uiView);

        }

    }
}
