import test = ui.test.ListUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

class TestUI extends ui.test.ListUI {
	constructor() {
		super();
	}
}

class subArea {
	scoreUI: TestUI;
	friendData: any;
	curIndex: number;
	constructor() {
		this.scoreUI = new TestUI();
		this.curIndex = 0;
	}
	init()
	{
		wx.getUserCloudStorage({keyList: ['score'],
			success:res => {
			console.log("score exists",res);
			if(res.KVDataList.length === 0 || (res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < 0 || parseInt(res.KVDataList[0].value) > 23*3)))
				this.setScore.apply(this,['0']);
			},
			fail:res => {
			console.log("no score",res);
			this.setScore.apply(this,['0']);
			},
			complete:function(res){}})
	}
	compare(score: string)
	{
		wx.getUserCloudStorage({keyList: ['score'],
			success:res => {
			console.log("score exists",res);
			if(res.KVDataList.length === 0 || (res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < 0 || parseInt(res.KVDataList[0].value) > 23*3)))
				this.setScore.apply(this,[score]);
			else if(res.KVDataList.length === 1 && (parseInt(res.KVDataList[0].value) < parseInt(score)))
				this.setScore.apply(this,[score]);
			},
			fail:res => {
			console.log("no score",res);
			this.setScore.apply(this,[score]);
			},
			complete:function(res){}})
	}
	setScore = (score: string) =>
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
		this.scoreUI.list.scrollTo(0);
		this.curIndex = 0;
		Laya.stage.removeChildren();
		wx.getFriendCloudStorage({keyList: ["score"],success:res => {this.setRankList.apply(this,[res])}, 
			fail:function(res){
			console.log("getFriendCloudStorage fail",res);
			},
			complete:function(res){}})
	}
	setRankList = (res) =>
	{
		console.log("getFriendCloudStorage success",res); 
		let friendData: Array<any> = res.data;
		console.log(friendData);
		for(let i: number = 0; i < friendData.length; i++)
		{
			//清除错误数据
			if(friendData[i].KVDataList.length === 0 || (friendData[i].KVDataList.length === 1 && (parseInt(friendData[i].KVDataList[0].value) < 0 || parseInt(friendData[i].KVDataList[0].value) > 23*3)))
			{
				friendData.splice(i,1);
				i--;
			}	
		}
		console.log(friendData);
		friendData.sort(function(a,b):number{return parseInt(b.KVDataList[0].value)-parseInt(a.KVDataList[0].value);});
		console.log(friendData);
		let arr: Array<any> = [];
		for (let i: number = 0; i < friendData.length; i++) {
			arr.push({ nickname: friendData[i].nickname, rank: i+1, score: friendData[i].KVDataList[0].value, avatar:friendData[i].avatarUrl});
		}
		this.scoreUI.list.array = arr;
		Laya.stage.addChild(this.scoreUI);
	}
	move(pos:number)
	{
		let i = Math.floor(Math.abs(pos) / 50);
		if(pos > 0)
		{
			if(this.curIndex + i < this.scoreUI.list.length)
				this.curIndex += i;
			else
				this.curIndex = this.scoreUI.list.length-1;
		}
		else
		{
			if(this.curIndex - i >= 0)
				this.curIndex -= i;
			else
				this.curIndex = 0;
		}
			this.scoreUI.list.tweenTo(this.curIndex,100*i);
	}
}

//初始化微信小游戏
Laya.MiniAdpter.init(true,true);
//程序入口
Laya.init(600, 700);
let sub = new subArea();

wx.onMessage(function(message){
	console.log(message);
	switch(message.type)
	{
		case "init":
			sub.init();
			break;
		case "update":
			sub.compare(message.score);
			break;
		case 'show':
			sub.show();
			break;
		case 'move':
			sub.move(message.pos);
			break;
		default:
	}
})





