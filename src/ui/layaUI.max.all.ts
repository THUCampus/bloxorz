
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class startUI extends View {
		public startButton:Laya.Button;
		public helpButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"name":"start","height":750},"child":[{"type":"Button","props":{"y":471,"x":414,"width":200,"var":"startButton","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelStroke":0,"labelSize":30,"label":"开始游戏","height":50}},{"type":"Button","props":{"y":473,"x":741,"width":200,"var":"helpButton","rotation":0,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelStroke":0,"labelSize":30,"label":"游戏帮助","height":50}},{"type":"Image","props":{"y":147,"x":392,"skin":"Bloxorz_副本.png","cacheAs":"normal"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.startUI.uiView);

        }

    }
}
