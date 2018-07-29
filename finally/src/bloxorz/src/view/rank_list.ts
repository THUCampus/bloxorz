/**Created by the LayaAirIDE*/
module view{
	export class rankList extends ui.rank_listUI{
		sharedCanvas: any;
    	subTex: Laya.Texture;
		startpos;
		endpos;
		state: boolean;
		constructor(){
			super();
			this.sharedCanvas = null;
			this.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
			this.state = false;
		}	
		draw()
		{
			wx.getOpenDataContext().canvas.width = 600;
			wx.getOpenDataContext().canvas.height = 700;
			wx.getOpenDataContext().postMessage({type:"show"});
			console.log("draw");
			this.graphics.clear();
			if(null===this.sharedCanvas)
			{
				this.sharedCanvas=wx.getOpenDataContext().canvas;
				this.subTex=new Laya.Texture(this.sharedCanvas);
			}
			if(null!=this.sharedCanvas)
			{
				this.subTex.bitmap.alwaysChange=true;
				this.graphics.drawTexture(this.subTex,0,0,600,700);
			}
		}
		mouseDown()
		{
			this.startpos = Laya.stage.mouseY;
			this.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
		}
		mouseUp()
		{
			this.endpos = Laya.stage.mouseY;
			wx.getOpenDataContext().postMessage({type:"move", pos: this.startpos-this.endpos});
		}
	}
}