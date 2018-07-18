// 程序入口
class LayaAir3D {
        public startui: ui.startUI;
        public gameui: ui.gameUI;
        public gamelogic: game;
    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //初始化引擎
        Laya3D.init(1334, 750, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        let scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        
        

        //添加照相机
        let camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0, 100))) as Laya.Camera;
        camera.orthographic = true;
        camera.orthographicVerticalSize = 10;
        camera.transform.translate(new Laya.Vector3(-5, 5, 20));
        camera.transform.rotate(new Laya.Vector3(-15, -15, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        let directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(1, -1, -1);

        //添加自定义模型
        let plane: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.PlaneMesh(10, 10, 10, 10))) as Laya.MeshSprite3D;
        let box1: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 2))) as Laya.MeshSprite3D;
        let box3: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(2, 1, 1))) as Laya.MeshSprite3D;
        //box1.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        box1.transform.translate(new Laya.Vector3(0,1,-1),false);
        box3.transform.translate(new Laya.Vector3(1.5,0.5,-1),false);
        let material: Laya.StandardMaterial = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box1.meshRender.material = material;
        box3.meshRender.material = material;
        Laya.stage.setChildIndex(scene,0);
        let res: Array<any> = [{url:"arrow.png",type:Laya.Loader.IMAGE},
         {url:"pause.png",type:Laya.Loader.IMAGE}];
        Laya.loader.load(res,Laya.Handler.create(this, this.loadui), null)
    }
    loadui()
    {
        this.startui = new ui.startUI();
        this.startui.startButton.on(Laya.Event.MOUSE_DOWN,this,this.loadgame);
        Laya.stage.addChild(this.startui);
        //this.helpButton.on(Laya.Event.MOUSE_DOWN,this,this.help);
    }
    loadgame()
    {
        Laya.stage.removeChild(this.startui);
        this.gameui = new ui.gameUI();
        Laya.stage.addChild(this.gameui);
        this.gameui.pausebutton.on(Laya.Event.MOUSE_DOWN,this,this.backtomain);
    }
    backtomain()
    {
        Laya.stage.removeChild(this.gameui);
        this.gameui.destroy();
        Laya.stage.addChild(this.startui);
    }
}

new LayaAir3D();
let a;
let loadGame = function(x)
{
    x = new game("1");
    console.log(x.move(4));
    console.log(x.move(2));
    console.log(x.move(4));
    console.log(x.move(2));
    console.log(x.move(4));
    console.log(x.move(2));
}
Laya.loader.load("res/" + "1" + ".json", Laya.Handler.create(this, loadGame,a), null, Laya.Loader.JSON);




