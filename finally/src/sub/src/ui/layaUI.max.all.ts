
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class ListUI extends View {
		public list:Laya.List;
		public nickname:Laya.Label;
		public rank:Laya.Label;
		public score:Laya.Label;
		public avatar:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":600,"mouseEnabled":true,"height":700,"centerY":0,"centerX":0},"child":[{"type":"List","props":{"width":600,"var":"list","spaceY":10,"repeatX":1,"mouseEnabled":true,"height":700,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"width":500,"name":"render","left":50,"height":60},"child":[{"type":"Label","props":{"y":0,"x":180,"var":"nickname","valign":"middle","text":"this is a list","skin":"comp/label.png","name":"nickname","height":60,"fontSize":25,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":0,"x":30,"var":"rank","valign":"middle","text":"123","name":"rank","height":60,"fontSize":30,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":0,"x":400,"var":"score","valign":"middle","text":"999","name":"score","height":60,"fontSize":30,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":110,"width":60,"var":"avatar","name":"avatar","height":60}}]}]},{"type":"Rect","props":{"width":600,"lineWidth":0,"height":700,"fillColor":"#000000"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.ListUI.uiView);

        }

    }
}
