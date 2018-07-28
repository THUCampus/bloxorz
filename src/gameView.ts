//view.ts负责游戏中的所有的元素显示、运动效果和与此相关的部分逻辑
//GameView类的一个实例对象就是一个游戏关卡

enum Direction{UP, DOWN, LEFT, RIGHT};
enum Operation{UP, DOWN, LEFT, RIGHT};
enum Block{EMPTY, ORDINARY, IRON, MUBAN, LIGHT, HEAVY, SPLIT, END, HELP};
enum State{GAMING, SUCCESS, FAILURE};


//一些常数
const block_depth: number = 0.1;        //地块厚度
const millisec: number = 10;            //计时器间隔

class GameView {
    public parent: MenuView;
    //Laya3D场景内容
    //元素
    public scene: Laya.Scene;
    public map: Array<Array<Laya.MeshSprite3D>>;
    public cube: Laya.MeshSprite3D;
    public light: Laya.PointLight;
    public spotLight: Laya.SpotLight;
    public directionLight: Laya.DirectionLight;
    //位置信息
    public camera_pos: Laya.Vector3;
    public cube_pos_init: Laya.Vector3
    public cube1_pos: Laya.Vector3;
    public cube2_pos: Laya.Vector3;
    public center_pos_pre: Laya.Vector3;
    public cube1_pos_pre: Laya.Vector3;
    public cube2_pos_pre: Laya.Vector3;

    //关卡常量
    public gate_index: number;
    public gate_info: JSON;
    //地图
    public map_info: Array<Array<number>>;
    public MAX_LENGTH: number;  //上下
    public MAX_WIDTH: number;   //左右
    //机关
    public switch_info: Array<Object>;
    public iron_list: Array<Object>;
    //灯光
    public light_range: number;
    public light_height: number;
    public light_global_on: boolean;
    //位置
    public start_pos: Array<number>;
    //资源url
    public BLOCK_URL: string;
    public BLOCK_IRON_URL: string;
    public BLOCK_MUBAN_URL: string;
    public CUBE_URL: string;
    public BLOCK_SWITCH_LIGHT_URL: string;
    public BLOCK_SWITCH_HEAVY_URL: string;
    public BLOCK_SWITCH_SPLIT_URL: string;

    //状态量
    public lastMove: Direction;
    public canOperate: boolean;
    //消息队列
    public messageQueue: Array<Operation>;
    public messageBusy: boolean;

    constructor (gate_index: number, parent: MenuView) {
        //构造函数
        this.parent = parent;
        //初始化类成员变量
        this.gate_index = gate_index;
        
        this.loadFile();
    }
    indexToString (gate_index: number): string{
        let gate_file = 'res/map_' + gate_index.toString() +'.json';
        return gate_file;
    }

    /**loadView加载场景内容相关函数 代码块开始 */
    loadFile () {
        this.messageQueue = new Array<Operation>();
        this.messageBusy = false;
        this.canOperate = false;
        this.parent.stepcount = 0;
        this.parent.setMovesCount();
        //调用loadView函数加载场景内容
        let gate_file = this.indexToString(this.gate_index);
        let levels_file = 'res/levels.json';
        let res: Array<any> = [{url: gate_file, type: Laya.Loader.JSON},
                            {url: levels_file, type: Laya.Loader.JSON}];
        Laya.loader.load(res, Laya.Handler.create(this, this.loadGateInfo, [gate_file, levels_file]), null);
    }
    loadGateInfo (gate_file: string, levels_file: string) {
        //读取关卡进度文件
        this.gate_info = Laya.loader.getRes(levels_file);
        if (this.gate_info['levels'][this.gate_index] !== -1) {
            this.loadView(gate_file);
        } else {
            console.log("this gate is not valiable");
        }
    }
    loadView (gate_file: string) {
        //读取关卡文件
        let json_info: JSON = Laya.Loader.getRes(gate_file);
        Laya.Loader.clearRes(gate_file);
        //初始化类成员变量
        this.camera_pos = new Laya.Vector3(json_info["camera_pos"][0], 
                                        json_info["camera_pos"][1], 
                                        json_info["camera_pos"][2]);
        //灯光
        this.light_range = 3;
        this.light_height = 3;
        this.light_global_on = json_info["light_on"];
        //资源url
        this.BLOCK_URL = json_info["url_block"];
        this.BLOCK_IRON_URL = json_info["url_iron"];
        this.BLOCK_MUBAN_URL = json_info["url_muban"];
        this.CUBE_URL = json_info["url_cube"];
        this.BLOCK_SWITCH_LIGHT_URL = json_info["url_switch_light"];
        this.BLOCK_SWITCH_HEAVY_URL = json_info["url_switch_heavy"];
        this.BLOCK_SWITCH_SPLIT_URL = json_info["url_switch_split"];
        //地图
        this.map_info = json_info["map"];
        this.MAX_LENGTH = json_info["map_length"];   //上下
        this.MAX_WIDTH = json_info["map_width"];     //左右 
        this.start_pos = json_info["startpos"];
        //机关
        this.switch_info = json_info["triggers"];
        this.iron_list = json_info["iron_list"];
        //元素位置信息
        this.cube_pos_init = new Laya.Vector3(this.start_pos[1], 0, this.start_pos[0]);
        this.cube1_pos = new Laya.Vector3(this.cube_pos_init.x, this.cube_pos_init.y, this.cube_pos_init.z);
        this.cube2_pos = new Laya.Vector3(this.cube_pos_init.x, this.cube_pos_init.y + 1, this.cube_pos_init.z);

        this.load();
    }
    load () {
        this.loadScene();
        //加入各元素
        if(this.light_global_on){
            this.loadDirectionLight();
        } else {
            this.loadSpotLight();
        }
        this.loadMap();
        this.loadCube();
        this.loadSelfLight();
        this.updateLightPos();
    }
    clearView () {
        this.messageQueue = new Array<Operation>();
        this.messageBusy = false;
        this.canOperate = false;
        //移除各元素
        Laya.stage.removeChild(this.scene);
    }
    reload () {
        this.clearView();
        this.loadFile();
    }
    loadNext () {
        this.clearView();
        this.updatePassedLevel();
        this.computeScore();
        this.unlockNextLevel();
        this.loadFile();
    }
    loadSelected (index: number) {
        this.clearView();
        this.gate_index = index;
        this.loadFile();
    }
    computeScore () {
        this.gate_info['levels'][this.gate_index] = 1;
    }
    updatePassedLevel(){
        if(this.gate_info['levels'][this.gate_index] === 0)
        {
            this.gate_info['passed_level'] += 1;
            let scoretemp: number = this.gate_info['passed_level'];
            let opendata = wx.getOpenDataContext();
            opendata.postMessage({type: 'update', score:scoretemp.toString()});
        }    
    }
    unlockNextLevel () {
        this.gate_index += 1;
        if (this.gate_info['levels'][this.gate_index] === -1) {
            this.gate_info['levels'][this.gate_index] = 0;
        }
    }
    loadScene () {
        //添加3D场景
        this.scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        this.scene.zOrder = -1;

        //添加照相机
        let camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(this.camera_pos);
        camera.transform.rotate(new Laya.Vector3(-30, -20, 0), true, false);
        camera.clearColor = null;
        camera.orthographic = true;
    }
    loadMap () {
        //地块材质
        const material_block: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_block.diffuseTexture = Laya.Texture2D.load(this.BLOCK_URL);
        const material_iron: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_iron.diffuseTexture = Laya.Texture2D.load(this.BLOCK_IRON_URL);
        const material_muban: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_muban.diffuseTexture = Laya.Texture2D.load(this.BLOCK_MUBAN_URL);
        const material_switch_light: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_switch_light.diffuseTexture = Laya.Texture2D.load(this.BLOCK_SWITCH_LIGHT_URL);
        const material_switch_heavy: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_switch_heavy.diffuseTexture = Laya.Texture2D.load(this.BLOCK_SWITCH_HEAVY_URL);
        const material_switch_split: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_switch_split.diffuseTexture = Laya.Texture2D.load(this.BLOCK_SWITCH_SPLIT_URL);
        const material_help: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_help.diffuseTexture = Laya.Texture2D.load("res/help.png");
        //添加地形
        this.map = new Array<Array<Laya.MeshSprite3D>>();
        for (let i = 0; i < this.MAX_WIDTH; i++) {
            this.map[i] = new Array<Laya.MeshSprite3D>();
            for (let j = 0; j < this.MAX_LENGTH; j++) {
                switch (this.map_info[j][i]) {
                    case Block.EMPTY:
                    //无地块
                    break;
                    case Block.ORDINARY:
                    //普通地块
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, block_depth))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_block;
                    break;
                    case Block.IRON:
                    //机关地块
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_iron;
                    break;
                    case Block.MUBAN:
                    //木地块
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_muban;
                    break;
                    case Block.LIGHT:
                    //轻压机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_switch_light;
                    break;
                    case Block.HEAVY:
                    //重压机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_switch_heavy;
                    break;
                    case Block.SPLIT:
                    //分身机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_switch_split;
                    break;
                    case Block.END:
                    //终点

                    break;
                    case Block.HELP:
                    //help界面
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.position = new Laya.Vector3(i, -1-block_depth/2, j);
                    this.map[i][j].meshRender.material = material_help;
                    break;
                    default:
                    break;
                }
            }
        }
        this.setTriggers();
    }
    loadCube () {
        //cube
        this.cube = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 2))) as Laya.MeshSprite3D; 
        let material_cube: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_cube.diffuseTexture = Laya.Texture2D.load(this.CUBE_URL);               //贴纸
        material_cube.albedo = new Laya.Vector4(6, 6, 6, 0.9);                      //透明效果
        material_cube.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        this.cube.meshRender.material = material_cube;
        let fall_height = 10;
        this.cube.transform.position = new Laya.Vector3(this.cube_pos_init.x, 
                                                        fall_height, 
                                                        this.cube_pos_init.z)                            //初始位置 
        this.fall_in(fall_height);
    }
    loadSelfLight () {
        //自发光
        this.light = this.scene.addChild(new Laya.PointLight()) as Laya.PointLight;
        this.light.range = this.light_range;
        this.light.attenuation = new Laya.Vector3(1, 1, 1);                   //衰减效果
    }
    loadSpotLight () {
        //范围聚光
        this.spotLight= this.scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
        this.spotLight.direction = new Laya.Vector3(0, -1, 0);
        this.spotLight.range = 100;
        this.spotLight.spot = 12;
        this.spotLight.attenuation = new Laya.Vector3(0.01, 0.01, 0.01);
    }
    loadDirectionLight () {
        //添加方向光
        this.directionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        this.directionLight.color = new Laya.Vector3(2, 2, 2);
        this.directionLight.direction = new Laya.Vector3(0.8, -1, -1.7);
    }
    /**loadView加载场景内容相关函数 代码块结束 */

    /**cube动作相关接口函数 代码块开始 目前12个动作 */
    moveUp () {
        const up_pivot: Laya.Vector3 = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.min(this.cube1_pos.z, this.cube2_pos.z) - 0.5);
        this.lastMove = Direction.UP;
        this.center_pos_pre = this.myPointRotate(this.cube.transform.position, up_pivot, new Laya.Vector3(-90, 0, 0));
        this.makeSound();
        this.moveAni(up_pivot, new Laya.Vector3(-10, 0, 0), 9);       //异步的
    }
    moveDown () {
        const down_pivot: Laya.Vector3 = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.max(this.cube1_pos.z, this.cube2_pos.z) + 0.5);
        this.lastMove = Direction.DOWN;
        this.center_pos_pre = this.myPointRotate(this.cube.transform.position, down_pivot, new Laya.Vector3(90, 0, 0));
        this.makeSound();
        this.moveAni(down_pivot, new Laya.Vector3(10, 0, 0), 9);       //异步的
    }
    moveLeft () {
        const left_pivot: Laya.Vector3 = new Laya.Vector3(Math.min(this.cube1_pos.x, this.cube2_pos.x) - 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.LEFT;
        this.center_pos_pre = this.myPointRotate(this.cube.transform.position, left_pivot, new Laya.Vector3(0, 0, 90));
        this.makeSound();
        this.moveAni(left_pivot, new Laya.Vector3(0, 0, 10), 9);       //异步的
    }
    moveRight () {
        const right_pivot: Laya.Vector3 = new Laya.Vector3(Math.max(this.cube1_pos.x, this.cube2_pos.x) + 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.RIGHT;
        this.center_pos_pre = this.myPointRotate(this.cube.transform.position, right_pivot, new Laya.Vector3(0, 0, -90));
        this.makeSound();
        this.moveAni(right_pivot, new Laya.Vector3(0, 0, -10), 9);       //异步的
    }
    fallUp () {
        this.fallAni(new Laya.Vector3(-10, 0, 0), 27);       //异步的
    }
    fallDown () {
        this.fallAni(new Laya.Vector3(10, 0, 0), 27);       //异步的
    }
    fallLeft () {
        this.fallAni(new Laya.Vector3(0, 0, 10), 27);       //异步的
    }
    fallRight () {
        this.fallAni(new Laya.Vector3(0, 0, -10), 27);       //异步的
    }
    fallUp_half (pivot: Laya.Vector3) {
        this.fallHalfAni(pivot, new Laya.Vector3(-10, 0, 0), 9);
    }
    fallDown_half (pivot: Laya.Vector3) {
        this.fallHalfAni(pivot, new Laya.Vector3(10, 0, 0), 9);
    }
    fallLeft_half (pivot: Laya.Vector3) {
        this.fallHalfAni(pivot, new Laya.Vector3(0, 0, 10), 9);
    }
    fallRight_half (pivot: Laya.Vector3) {
        this.fallHalfAni(pivot, new Laya.Vector3(0, 0, -10), 9);
    }
    /**cube动作相关接口函数 代码块结束 */

    /**cube动作接口函数调用的动画函数 代码块开始 */
    moveAni (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doRotate(pivotVector, rotateVector);
            count++;
            if(count >= times){
                //旋转90度调用回调函数
                clearInterval(newTimer);
                this.updateCubePos();
                this.checkState();
            }
        }, millisec);
    }
    fallAni (rotateVector: Laya.Vector3, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doFall(this.cube.transform.position, rotateVector);
            count++;
            if(count >= times){
                clearInterval(newTimer);
                //游戏失败的处理
                console.log("fail");
                this.restart();
            }
        }, millisec);
    }
    fallHalfAni (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doRotate(pivotVector, rotateVector);
            count++;
            if(count >= times){
                //旋转90度调用回调函数
                clearInterval(newTimer);
                this.updateCubePos();
                this.fallAni(rotateVector, 27);       //异步的
            }
        }, millisec);
    }
    fallStraightWinAni (rate: number, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doFallStraight(rate);
            count++;
            if(count >= times){
                clearInterval(newTimer);
                //游戏胜利的处理
                console.log("success");
                if (this.gate_index === 0) {
                    this.loadSelected(this.parent.getCurrentLevel());
                } else {
                    this.goToNext();
                }
            }
        }, millisec);
    }
    fallStraightLoseAni (block: Laya.MeshSprite3D, rate: number, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doFallStraight(rate);
            this.doFallBlock(block, rate + 0.1);
            count++;
            if(count >= times){
                clearInterval(newTimer);
                //红木掉落的处理
                console.log("red");
                this.restart();
            }
        }, millisec);
    }
    fallInAni (rate: number, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doFallStraight(rate);
            count++;
            if(count >= times){
                clearInterval(newTimer);
                this.canOperate = true;
            }
        }, millisec);
    }
    restartAni (times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doDark();
            count++;
            if(count >= times){
                clearInterval(newTimer);
                this.reload();
            }
        }, millisec);
    }
    /**cube动作接口函数调用的动画函数 代码块结束 */

    /**cube动作接口函数调用的动画函数调用的分解动作函数 代码块开始 */
    doFall (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        this.myRotate(this.cube, pivotVector, rotateVector);
        this.myFallStraight(this.cube, 0.5);
        this.updateLightPos();
    }
    doRotate (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        this.myRotate(this.cube, pivotVector, rotateVector);
        this.updateLightPos();
    }
    doFallStraight (rate: number) {
        this.myFallStraight(this.cube, rate);
        this.updateLightPos();
    }
    doFallBlock (block: Laya.MeshSprite3D, rate: number) {
        this.myFallStraight(block, rate);
    }
    doDark () {
        if (!this.light_global_on) {
            this.spotLight.attenuation = new Laya.Vector3(this.spotLight.attenuation.x,
                                                    this.spotLight.attenuation.y + 0.03,
                                                    this.spotLight.attenuation.z);
        }
        if (this.light_global_on) {
            this.directionLight.color = new Laya.Vector3(this.directionLight.color.x - 0.05,
                                                        this.directionLight.color.y - 0.05,
                                                        this.directionLight.color.z - 0.05)
        }
    }
    /**cube动作接口函数调用的动画函数调用的分解动作函数 代码块结束 */

    /**cube动作接口函数调用的动画函数调用的分解动作函数调用的原子动作函数 代码块开始 */
    myFallStraight (item: Laya.MeshSprite3D, rate: number) {
        item.transform.position = new Laya.Vector3(item.transform.position.x, 
                                                        item.transform.position.y - rate,
                                                        item.transform.position.z);
    }
    myRotate (item: Laya.MeshSprite3D, pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        //Laya的旋转机制有毒 自己写了cube旋转函数 支持翻转
        //pivotVector 是旋转轴
        //rotateVector 是旋转方向及角度
        let quaternion: Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(rotateVector.y / 180 * Math.PI, rotateVector.x / 180 * Math.PI, rotateVector.z / 180 * Math.PI, quaternion);
        
        //cube
        item.transform.rotate(rotateVector, false, false);
        let oldposition_item: Laya.Vector3 = new Laya.Vector3(item.transform.position.x - pivotVector.x,
                                                            item.transform.position.y - pivotVector.y, 
                                                            item.transform.position.z - pivotVector.z);
        let newposition_item: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.transformQuat(oldposition_item, quaternion, newposition_item);
        item.transform.position = new Laya.Vector3(newposition_item.x + pivotVector.x,
                                                        newposition_item.y + pivotVector.y, 
                                                        newposition_item.z + pivotVector.z);   
    }
    myPointRotate (position: Laya.Vector3, pivotVector: Laya.Vector3, rotateVector: Laya.Vector3): Laya.Vector3{
        //Laya的旋转机制有毒 自己写了点的位置的旋转函数
        //pivotVector 是旋转轴
        //rotateVector 是旋转方向及角度
        let quaternion: Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(rotateVector.y / 180 * Math.PI, rotateVector.x / 180 * Math.PI, rotateVector.z / 180 * Math.PI, quaternion);
        
        //point
        let oldposition: Laya.Vector3 = new Laya.Vector3(position.x - pivotVector.x,
                                                            position.y - pivotVector.y, 
                                                            position.z - pivotVector.z);
        let newposition: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.transformQuat(oldposition, quaternion, newposition);
        return new Laya.Vector3(newposition.x + pivotVector.x,
                                                        newposition.y + pivotVector.y, 
                                                        newposition.z + pivotVector.z);   
    }
    updateLightPos () {
        //更新灯光位置
        //自发光
        this.light.transform.position = this.cube.transform.position;
        //视野聚光
        if (!this.light_global_on) {
            this.spotLight.transform.position = new Laya.Vector3(this.light.transform.position.x, 
                                                            this.light_height, 
                                                            this.light.transform.position.z);
        }
   }
    updateCubePos () {
        //四舍五入修正坐标 尚未矫正偏角 不过实际效果偏角误差观察不出
        let cube_x: number = Math.round(this.cube.transform.position.x * 2) / 2;
        let cube_y: number = Math.round(this.cube.transform.position.y * 2) / 2;
        let cube_z: number = Math.round(this.cube.transform.position.z * 2) / 2;
        this.cube.transform.position = new Laya.Vector3(cube_x, cube_y, cube_z);
        this.updateLightPos();
        
        //获取新的cube两方块位置
        let center_x: number = Math.floor(cube_x);
        let center_z: number = Math.floor(cube_z);
        if (center_x === cube_x && center_z === cube_z) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(center_x, 1, center_z);
        } else if (center_x === cube_x) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(center_x, 0, cube_z * 2 - center_z);
        } else if (center_z === cube_z) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(cube_x * 2 - center_x, 0, center_z);
        } else {
            //异常处理
            console.log("updateCubePos需要异常处理！");
        }
    }
    updateCubePosPre () {
        //四舍五入修正坐标 尚未矫正偏角 不过实际效果偏角误差观察不出
        let cube_x: number = Math.round(this.center_pos_pre.x * 2) / 2;
        let cube_y: number = Math.round(this.center_pos_pre.y * 2) / 2;
        let cube_z: number = Math.round(this.center_pos_pre.z * 2) / 2;
        this.center_pos_pre = new Laya.Vector3(cube_x, cube_y, cube_z);
        
        //获取新的cube两方块位置
        let center_x: number = Math.floor(cube_x);
        let center_z: number = Math.floor(cube_z);
        if (center_x === cube_x && center_z === cube_z) {
            this.cube1_pos_pre = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos_pre = new Laya.Vector3(center_x, 1, center_z);
        } else if (center_x === cube_x) {
            this.cube1_pos_pre = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos_pre = new Laya.Vector3(center_x, 0, cube_z * 2 - center_z);
        } else if (center_z === cube_z) {
            this.cube1_pos_pre = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos_pre = new Laya.Vector3(cube_x * 2 - center_x, 0, center_z);
        } else {
            //异常处理
            console.log("updateCubePos需要异常处理！");
        }
    }
    /**cube动作接口函数调用的动画函数调用的分解动作函数调用的原子动作函数 代码块结束 */

    /**cube动作接口函数所需的逻辑 代码块开始 */
    fall_full (dir: Direction) {
        this.canOperate = false;
        switch (dir) {
            case Direction.UP:
            this.fallUp();
            break;
            case Direction.DOWN:
            this.fallDown();
            break;
            case Direction.LEFT:
            this.fallLeft();
            break;
            case Direction.RIGHT:
            this.fallRight();
            break;
            default:
            //异常处理
            console.log("fall_full需要异常处理！");
            break;
        }
    }
    fall_half (pos_empty: Laya.Vector3, pos_safe: Laya.Vector3) {
        this.canOperate = false;
        if (pos_empty.x > pos_safe.x) {
            let pivot: Laya.Vector3 = new Laya.Vector3(pos_empty.x - 0.5, -1, pos_empty.z);
            this.fallRight_half(pivot);
        } else if (pos_empty.x < pos_safe.x) {
            let pivot: Laya.Vector3 = new Laya.Vector3(pos_empty.x + 0.5, -1, pos_empty.z);
            this.fallLeft_half(pivot);
        } else if (pos_empty.z > pos_safe.z) {
            let pivot: Laya.Vector3 = new Laya.Vector3(pos_empty.x, -1, pos_empty.z - 0.5);
            this.fallDown_half(pivot);
        } else if (pos_empty.z < pos_safe.z) {
            let pivot: Laya.Vector3 = new Laya.Vector3(pos_empty.x, -1, pos_empty.z + 0.5);
            this.fallUp_half(pivot);
        } else {
            //异常处理
            console.log("fall_half需要异常处理！");
        }
    }
    fall_straight_win () {
        this.canOperate = false;
        this.fallStraightWinAni(0.2, 27);
    }
    fall_straight_lose (block: Laya.MeshSprite3D) {
        this.canOperate = false;
        this.fallStraightLoseAni(block, 0.2, 27);
    }
    fall_in (height: number) {
        this.fallInAni(1, height);
    }
    checkEmpty (pos: Laya.Vector3): boolean{
        if (pos.x >= this.MAX_WIDTH || pos.x < 0 || pos.z >= this.MAX_LENGTH || pos.z < 0) {
            return true;
        } else if (this.map_info[pos.z][pos.x] === Block.EMPTY) {
            return true;
        } else if (this.map_info[pos.z][pos.x] === Block.IRON && this.getIronInfo(pos.x, pos.z)["state"] === false) {
            return true;
        }
        return false;
    }
    getSwitchInfo (x: number, z: number): Object{
        for (let i: number = 0, len: number = this.switch_info.length; i < len; i++) {
            if (this.switch_info[i]["switch_pos"][0] === z 
            && this.switch_info[i]["switch_pos"][1] === x) {
                return this.switch_info[i];
            }
        }
        return null;
    }
    getIronInfo (x: number, z: number): Object{
        for (let i: number = 0, len: number = this.switch_info.length; i < len; i++) {
            for (let j: number = 0, wid: number = this.switch_info[i]["control_list"].length; j < wid; j++) {
                if (this.iron_list[this.switch_info[i]["control_list"][j]["index"]]["iron_pos"][0] === z
                && this.iron_list[this.switch_info[i]["control_list"][j]["index"]]["iron_pos"][1] === x) {
                    return this.iron_list[this.switch_info[i]["control_list"][j]["index"]];
                }
            }
        }
        return null;
    }
    controlTriggers (trigger: Object): void{
        if (trigger["used"] && trigger["once"]) {
            return;
        }
        trigger["used"] = true;
        for (let i: number = 0, len: number = trigger["control_list"].length; i < len; i++) {
            if (trigger["control_list"][i]["type"] === "both") {
                if (this.iron_list[trigger["control_list"][i]["index"]]["state"] === true) {
                    this.iron_list[trigger["control_list"][i]["index"]]["state"] = false;
                    this.moveTriggersOff(this.iron_list[trigger["control_list"][i]["index"]]);
                } else if (this.iron_list[trigger["control_list"][i]["index"]]["state"] === false) {
                    this.iron_list[trigger["control_list"][i]["index"]]["state"] = true;
                    this.moveTriggersOn(this.iron_list[trigger["control_list"][i]["index"]]);
                } else {
                    console.log("need write code");
                }
            }
            if (trigger["control_list"][i]["type"] === "off") {
                if (this.iron_list[trigger["control_list"][i]["index"]]["state"] === true) {
                    this.iron_list[trigger["control_list"][i]["index"]]["state"] = false;
                    this.moveTriggersOff(this.iron_list[trigger["control_list"][i]["index"]]);
                } else {
                    console.log("need write code");
                }
            } else if(trigger["control_list"][i]["type"] === "on") {
                if (this.iron_list[trigger["control_list"][i]["index"]]["state"] === false) {
                    this.iron_list[trigger["control_list"][i]["index"]]["state"] = true;
                    this.moveTriggersOn(this.iron_list[trigger["control_list"][i]["index"]]);
                } else {
                    console.log("need write code");
                }
            } else {
                console.log("not find control_list.type or type === both");
            }
        }
    }
    setTriggers (): void{
        for (let i: number = 0, len: number = this.iron_list.length; i < len; i++) {
            if (this.iron_list[i]["state"] === false) {
                this.moveTriggersOff(this.iron_list[i]);
            }
        }
    }
    moveTriggersOff (iron: Object): void{
        let iron_block = this.map[iron["iron_pos"][1]][iron["iron_pos"][0]];
        switch (iron["off"]) {
            case "left":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x - 0.5,
                                                            iron_block.transform.position.y - block_depth / 2,
                                                            iron_block.transform.position.z) , new Laya.Vector3(0, 0, -20), 9);
            break;
            case "right":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x + 0.5,
                                                            iron_block.transform.position.y - block_depth / 2,
                                                            iron_block.transform.position.z) , new Laya.Vector3(0, 0, 20), 9);
            break;
            case "up":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x,
                                                            iron_block.transform.position.y - block_depth / 2,
                                                            iron_block.transform.position.z - 0.5) , new Laya.Vector3(20, 0, 0), 9);
            break;
            case "down":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x,
                                                            iron_block.transform.position.y - block_depth / 2,
                                                            iron_block.transform.position.z + 0.5) , new Laya.Vector3(-20, 0, 0), 9);
            break;
            default:
                console.log("moveTriggersOff exception");
            break;
        }
    }
    moveTriggersOn (iron: Object): void{
        let iron_block = this.map[iron["iron_pos"][1]][iron["iron_pos"][0]];
        switch (iron["off"]) {
            case "left":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x + 0.5,
                                                            iron_block.transform.position.y + block_depth / 2,
                                                            iron_block.transform.position.z) , new Laya.Vector3(0, 0, 20), 9);
            break;
            case "right":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x - 0.5,
                                                            iron_block.transform.position.y + block_depth / 2,
                                                            iron_block.transform.position.z) , new Laya.Vector3(0, 0, -20), 9);
            break;
            case "up":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x,
                                                            iron_block.transform.position.y + block_depth / 2,
                                                            iron_block.transform.position.z + 0.5) , new Laya.Vector3(-20, 0, 0), 9);
            break;
            case "down":
                this.ironRotateAni(iron_block, new Laya.Vector3(iron_block.transform.position.x,
                                                            iron_block.transform.position.y + block_depth / 2,
                                                            iron_block.transform.position.z - 0.5) , new Laya.Vector3(20, 0, 0), 9);
            break;
            default:
                console.log("moveTriggersOn exception");
            break;
        }
    }
    ironRotateAni (iron_block: Laya.MeshSprite3D, pivotVector: Laya.Vector3, rotateVector: Laya.Vector3, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.doIronRotate(iron_block, pivotVector, rotateVector);
            count++;
            if(count >= times){
                //旋转180度调用回调函数
                clearInterval(newTimer);
            }
        }, millisec);
    }
    doIronRotate (iron_block: Laya.MeshSprite3D, pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        this.myRotate(iron_block, pivotVector, rotateVector);
    }
    split (): void{

    }
    playSound (name: string): void{
        Laya.SoundManager.playSound("sound/" + name + ".mp3");
    }
    judgeType (position: Laya.Vector3): Block{
        return this.map_info[position.z][position.x];
    }
    makeSound (): void{
        //先修正一下预测位置
        this.updateCubePosPre();

        let name: string;

        //普通掉落
        let fall_1: boolean = this.checkEmpty(this.cube1_pos_pre);
        let fall_2: boolean = this.checkEmpty(this.cube2_pos_pre);
        if (fall_1 === true && fall_2 === true) {
            name = "fall";
        } else if (fall_1 === true) {
            name = "fall";
        } else if (fall_2 === true) {
            name = "fall";
        } else {
            let type_1: Block = this.judgeType(this.cube1_pos_pre);
            let type_2: Block = this.judgeType(this.cube2_pos_pre);
            //发声有点复杂 暂时暴力一点 根据权重瞎选一个播放
            //轻机关 优先
            //然后 铁板
            //木板 其次
            //最后 石板
            if (type_1 === Block.LIGHT || type_2 === Block.LIGHT) {
                name = "trigger";
            } else if (type_1 === Block.HELP || type_2 === Block.HELP) {
                name = "trigger";
            } else if (type_1 === Block.IRON) {
                if (this.getIronInfo(this.cube1_pos_pre.x, this.cube1_pos_pre.z)["state"]) {
                    name = "metal";
                }
            } else if (type_2 === Block.IRON) {
                if (this.getIronInfo(this.cube2_pos_pre.x, this.cube2_pos_pre.z)["state"]) {
                    name = "metal";
                }
            } else if (type_1 === Block.MUBAN || type_2 === Block.MUBAN) {
                name = "wood";
            } else if (this.cube1_pos_pre.x === this.cube2_pos_pre.x && this.cube1_pos_pre.z === this.cube2_pos_pre.z
                    && type_1 === Block.HEAVY) {
                name = "trigger";
            } else if (this.cube1_pos_pre.x === this.cube2_pos_pre.x && this.cube1_pos_pre.z === this.cube2_pos_pre.z
                    && type_1 === Block.SPLIT) {
                name = "transform";
            } else if (this.cube1_pos_pre.x === this.cube2_pos_pre.x && this.cube1_pos_pre.z === this.cube2_pos_pre.z
                    && type_1 === Block.END) {
                name = "end";
            } else {
                name = "stone";
            }
        }

        this.playSound(name);
    }
    checkFall (): State {
        //普通掉落
        let fall_1: boolean = this.checkEmpty(this.cube1_pos);
        let fall_2: boolean = this.checkEmpty(this.cube2_pos);
        if (fall_1 === true && fall_2 === true) {
            this.fall_full(this.lastMove);
            return State.FAILURE;
        } else if (fall_1 === true) {
            this.fall_half(this.cube1_pos, this.cube2_pos);
            return State.FAILURE;
        } else if (fall_2 === true) {
            this.fall_half(this.cube2_pos, this.cube1_pos);
            return State.FAILURE;
        }

        //红木掉落
        if (this.cube1_pos.x === this.cube2_pos.x && this.cube1_pos.z === this.cube2_pos.z
        && this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.MUBAN) {
            this.fall_straight_lose(this.map[this.cube1_pos.x][this.cube1_pos.z]);
            return State.FAILURE;
        }

        //终点掉落
        let win_1: boolean = (this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.END);
        let win_2: boolean = (this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.END);
        if(win_1 === true && win_2 === true){
            this.fall_straight_win();
            return State.SUCCESS;
        }

        //踩到轻机关
        if ((this.cube1_pos.x === this.cube2_pos.x && this.cube1_pos.z === this.cube2_pos.z
        && this.map_info[this.cube1_pos.z][this.cube2_pos.x] === Block.LIGHT) 
        || this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.LIGHT
        || this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.LIGHT) {
            this.controlTriggers(this.getSwitchInfo(this.cube1_pos.x, this.cube1_pos.z));
        }
        //踩到重机关
        if (this.cube1_pos.x === this.cube2_pos.x && this.cube1_pos.z === this.cube2_pos.z
        && this.map_info[this.cube1_pos.z][this.cube2_pos.x] === Block.HEAVY) {
            this.controlTriggers(this.getSwitchInfo(this.cube1_pos.x, this.cube1_pos.z));
        }
        //踩到分身机关
        if (this.cube1_pos.x === this.cube2_pos.x && this.cube1_pos.z === this.cube2_pos.z
        && this.map_info[this.cube1_pos.z][this.cube2_pos.x] === Block.SPLIT) {
            this.split();
        }
        return State.GAMING;
    }
    checkState () {
        //检查游戏状态 判断是否应该重新开始 或者进行下一关
        let currentState: State = this.checkFall();
        if (currentState === State.FAILURE) {
            //啥也不用干 因为会在掉落动画结束后处理
            return;
        } else if(currentState === State.SUCCESS) {
            //啥也不用干 因为会在掉落动画结束后处理
            return;
        } else if (currentState === State.GAMING) {
            //维持消息机制
            this.checkMessageQueue();
        }
    }
    restart () {
        this.restartAni(30);
    }
    goToNext () {
        this.loadNext();
    }
    /**cube动作接口函数所需的逻辑 代码块结束 */

    /**消息机制 代码块开始 */
    addMessage (operation: Operation) {
        if (!this.canOperate) {
            return;
        }
        this.messageQueue.push(operation);
        if (!this.messageBusy) {
            this.messageBusy = true;
            this.checkMessageQueue();
        }
    }
    checkMessageQueue () {
        if (!this.canOperate) {
            return;
        }
        if (this.messageQueue.length === 0) {
            this.messageBusy = false;
            return;
        } else {
            let nextOperation: Operation = this.messageQueue.shift();
            switch (nextOperation) {
                case Operation.UP:
                this.moveUp();
                break;
                case Operation.DOWN:
                this.moveDown();
                break;
                case Operation.LEFT:
                this.moveLeft();
                break;
                case Operation.RIGHT:
                this.moveRight();
                break;
                default:
                //异常处理
                console.log("checkMessageQueue需要异常处理！");
                break;
            }
        }
    }
    /**消息机制 代码块结束 */
}