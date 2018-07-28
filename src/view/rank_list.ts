/**Created by the LayaAirIDE*/
module view{
	export class rankList extends ui.rank_listUI{
		sharedCanvas: any;
    	subTex: Laya.Texture;
		constructor(){
			super();
			this.sharedCanvas = null;
		}	
		draw()
		{
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
				this.graphics.drawTexture(this.subTex,50,50,500,600);
			}
		}
	}
}