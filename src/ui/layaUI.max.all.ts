
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class finishUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":600}};
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

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"game","height":750},"child":[{"type":"Button","props":{"width":150,"visible":true,"var":"leftbutton","stateNum":1,"skin":"arrow.png","right":290,"mouseEnabled":true,"height":85,"bottom":165}},{"type":"Button","props":{"width":150,"var":"downbutton","stateNum":1,"skin":"arrow.png","rotation":270,"right":150,"mouseEnabled":true,"height":85,"bottom":-50}},{"type":"Button","props":{"width":150,"visible":true,"var":"rightbutton","stateNum":1,"skin":"arrow.png","rotation":180,"right":-80,"mouseEnabled":true,"height":85,"bottom":80}},{"type":"Button","props":{"width":150,"visible":true,"var":"upbutton","stateNum":1,"skin":"arrow.png","rotation":90,"right":65,"mouseEnabled":true,"height":85,"bottom":300}},{"type":"Button","props":{"width":64,"var":"pausebutton","top":10,"stateNum":1,"skin":"pause.png","right":10,"height":64}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.uiView);
            this.leftbutton.on(Laya.Event.MOUSE_DOWN,this,this.lbhit);
            this.rightbutton.on(Laya.Event.MOUSE_DOWN,this,this.lbhit);
            this.upbutton.on(Laya.Event.MOUSE_DOWN,this,this.lbhit);
            this.downbutton.on(Laya.Event.MOUSE_DOWN,this,this.lbhit);
        }
        lbhit()
        {
            console.log("lb");
        }
    }
}

module ui {
    export class helpUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":600}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.helpUI.uiView);

        }

    }
}

module ui {
    export class pauseUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":500,"height":300}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pauseUI.uiView);

        }

    }
}

module ui {
    export class selectUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":600}};
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

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"start","height":750},"child":[{"type":"Button","props":{"width":200,"var":"startButton","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelStroke":0,"labelSize":30,"labelAlign":"center","label":"开始游戏","height":50,"centerY":100,"centerX":-100,"blendMode":"lighter"}},{"type":"Button","props":{"width":200,"var":"helpButton","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelStroke":0,"labelSize":30,"labelAlign":"center","label":"游戏帮助","height":50,"centerY":100,"centerX":100,"blendMode":"lighter"}},{"type":"Image","props":{"skin":"logo.png","centerY":-100,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.startUI.uiView);
            
        }
        start()
        {
            console.log("st");
        }
        help()
        {
            console.log("lb");
        }
    }
}
