import test = ui.test.ListUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

class TestUI extends ui.test.ListUI {
	constructor() {
		super();
		var arr: Array<any> = [];
		for (var i: number = 0; i < 100; i++) {
			arr.push({ nickname: "item " + i, rank: i, score: i, avatar:"res/muban.png"});
		}
		//给list赋值更改list的显示
		this.list.array = arr;
	}
	private onBtn2Click(): void {
		//list赋值，先获得一个数据源数组
		

		//还可以自定义list渲染方式，可以打开下面注释看一下效果
		//list.renderHandler = new Handler(this, onListRender);
	}
	private onListRender(item: Laya.Box, index: number): void {
		//自定义list的渲染方式
		var label: Label = item.getChildByName("label") as Label;
		if (index % 2) {
			label.color = "#ff0000";
		} else {
			label.color = "#000000";
		}
	}
}

class subArea {
	scoreUI: TestUI;
	friendData: any;
	constructor() {
		let res: Array<any> = [{url:"res/muban.png",type:Laya.Loader.IMAGE}];
		Laya.loader.load(res,Laya.Handler.create(this, function(){this.scoreUI = new TestUI();/*Laya.stage.addChild(subUI)*/;}), null);
	}
	init()
	{
		wx.getUserCloudStorage({keyList: ['score'],success:function(res){
			console.log("score exists",res);
			},
			fail:function(res){
			console.log("no score",res);
			wx.setUserCloudStorage({
			KVDataList: [{key:"score",value:'0'}],
			success:function(res){
			console.log("setUserCloudStorage success init",res)},
			fail:function(res){
			console.log("setUserCloudStorage fail init",res)},
			complete:function(res){}
			});
			},
			complete:function(res){}})
	}
	setScore(score: string)
	{
		wx.setUserCloudStorage({
			KVDataList: [{key:"score",value:score}],
			success:function(res){
			console.log("setUserCloudStorage success",res)},
			fail:function(res){
			console.log("setUserCloudStorage fail",res)},
			complete:function(res){}
			});
	}
	show()
	{
		//this.getFriendScore();
		Laya.stage.addChild(this.scoreUI);
	}
	getFriendScore()
	{
		let temp;
		wx.getFriendCloudStorage({keyList: ["score"],success:function(res){
			console.log("getFriendCloudStorage success",res); temp = res.data;}, 
			fail:function(res){
			console.log("getFriendCloudStorage fail",res);
			},
			complete:function(res){}})
	}
}

//初始化微信小游戏
Laya.MiniAdpter.init(true,true);
//程序入口
Laya.init(500, 600);
Laya.stage.bgColor = null;
let sub = new subArea();

wx.onMessage(function(message){
	console.log(message);
	switch(message.type)
	{
		case "init":
			sub.init();
			break;
		case "update":
			sub.setScore(message.score);
			break;
		case 'show':
			sub.show();
			break;
		default:
	}
})





