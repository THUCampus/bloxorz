enum Direction{UP, DOWN, LEFT, RIGHT};
enum Operation{UP, DOWN, LEFT, RIGHT};
enum Block{EMPTY, ORDINARY, IRON, MUBAN, LIGHT, HEAVY, FLASH, END};
enum State{GAMING, SUCCESS, FAILURE};

class GameView {
    public scene: Laya.Scene;
    public map_info: Array<Array<number>>;
    public map: Array<Array<Laya.MeshSprite3D>>;
    public light: Laya.PointLight;
    public light_range: number;
    public cube: Laya.MeshSprite3D;
    public spotLight: Laya.SpotLight;
    public light_height: number;
    public start_pos: Array<number>;
    public cube1_pos: Laya.Vector3;
    public cube2_pos: Laya.Vector3;
    public center_pos: Laya.Vector3;
    public lastMove: Direction;
    public MAX_LENGTH: number;
    public MAX_WIDTH: number;

    //消息队列
    public messageQueue: Array<Operation>;
    public messageBusy: boolean;

    constructor (gate_file: string) {
        //初始化引擎
        //Laya3D.init(0, 0, true);

        //适配模式
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        //Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        //Laya.Stat.show();

        //添加3D场景
        this.scene= Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        //添加照相机
        let camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(-5, 6, 20));
        camera.transform.rotate(new Laya.Vector3(-5, -30, 0), true, false);
        camera.clearColor = null;
/*
        //添加方向光
        let directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(1, -1, 0);
*/
        //初始化类成员变量
        this.messageQueue = new Array<Operation>();
        this.messageBusy = false;
        Laya.loader.load(gate_file, Laya.Handler.create(this, this.loadView, [gate_file]), null, Laya.Loader.JSON);
    }
    loadView (gate_file: string) {
        //一些常数
        this.light_height = 3;
        const block_depth: number = 0.1;

        //读取关卡文件
        let json_info: JSON = Laya.Loader.getRes(gate_file);

        //初始化类成员变量
        this.MAX_LENGTH = json_info["map_width"];
        this.MAX_WIDTH = json_info["map_length"];
        const BLOCK_URL: string = json_info["url_block"];
        const BLOCK_IRON_URL: string = json_info["url_iron"];
        const BLOCK_MUBAN_URL: string = json_info["url_muban"];
        const CUBE_URL: string = json_info["url_cube"];
        const material_block: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_block.diffuseTexture = Laya.Texture2D.load(BLOCK_URL);
        const material_iron: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_iron.diffuseTexture = Laya.Texture2D.load(BLOCK_IRON_URL);
        const material_muban: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_muban.diffuseTexture = Laya.Texture2D.load(BLOCK_MUBAN_URL);
        this.map_info = json_info["map"];
        this.map = new Array<Array<Laya.MeshSprite3D>>();
        this.light_range = 3;
        this.start_pos = json_info["startpos"];
        const cube_pos_init: Laya.Vector3 = new Laya.Vector3(this.start_pos[0], 0, this.start_pos[1]);
        this.cube1_pos = new Laya.Vector3(cube_pos_init.x, cube_pos_init.y, cube_pos_init.z);
        this.cube2_pos = new Laya.Vector3(cube_pos_init.x, cube_pos_init.y + 1, cube_pos_init.z);

        //添加地形
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
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_block;
                    break;
                    case Block.IRON:
                    //机关地块
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_iron;
                    break;
                    case Block.MUBAN:
                    //木地块
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_muban;
                    break;
                    case Block.LIGHT:
                    //轻压机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_block;
                    break;
                    case Block.HEAVY:
                    //重压机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_block;
                    break;
                    case Block.FLASH:
                    //分身机关
                    this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1))) as Laya.MeshSprite3D;
                    this.map[i][j].transform.translate(new Laya.Vector3(i, -1-block_depth/2, j), true);
                    this.map[i][j].meshRender.material = material_block;
                    break;
                    case Block.END:
                    //终点

                    break;
                    default:
                    break;
                }
            }
        }

        //cube
        this.cube = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 2))) as Laya.MeshSprite3D;
        this.cube.transform.translate(cube_pos_init);                              //初始位置  
        let material_cube: Laya.StandardMaterial = new Laya.StandardMaterial();
        material_cube.diffuseTexture = Laya.Texture2D.load(CUBE_URL);               //贴纸
        material_cube.albedo = new Laya.Vector4(6, 6, 6, 0.9);                      //透明效果
        material_cube.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        this.cube.meshRender.material = material_cube;

        //自发光
        this.light = this.scene.addChild(new Laya.PointLight()) as Laya.PointLight;
        this.light.transform.translate(cube_pos_init);
        this.light.range = this.light_range;
        this.light.attenuation = new Laya.Vector3(0.4, 0.4, 0.4);                   //衰减效果

        //范围聚光
        this.spotLight= this.scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
        this.spotLight.transform.position = new Laya.Vector3(this.light.transform.position.x, this.light_height, this.light.transform.position.z);
        this.spotLight.direction = new Laya.Vector3(0, -1, 0);
        this.spotLight.range = 100;
        this.spotLight.spot = 12;
        this.spotLight.attenuation = new Laya.Vector3(0.01, 0.01, 0.01);
    }
    moveUp () {
        const up_pivot: Laya.Vector3 = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.min(this.cube1_pos.z, this.cube2_pos.z) - 0.5);
        this.lastMove = Direction.UP;
        this.moveAni(up_pivot, new Laya.Vector3(-10, 0, 0), 9);       //异步的
    }
    moveDown () {
        const down_pivot: Laya.Vector3 = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.max(this.cube1_pos.z, this.cube2_pos.z) + 0.5);
        this.lastMove = Direction.DOWN;
        this.moveAni(down_pivot, new Laya.Vector3(10, 0, 0), 9);       //异步的
    }
    moveLeft () {
        const left_pivot: Laya.Vector3 = new Laya.Vector3(Math.min(this.cube1_pos.x, this.cube2_pos.x) - 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.LEFT;
        this.moveAni(left_pivot, new Laya.Vector3(0, 0, 10), 9);       //异步的
    }
    moveRight () {
        const right_pivot: Laya.Vector3 = new Laya.Vector3(Math.max(this.cube1_pos.x, this.cube2_pos.x) + 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.RIGHT;
        this.moveAni(right_pivot, new Laya.Vector3(0, 0, -10), 9);       //异步的
    }
    fallUp () {
        this.fallAni(new Laya.Vector3(-10, 0, 0), 9);       //异步的
    }
    fallDown () {
        this.fallAni(new Laya.Vector3(10, 0, 0), 9);       //异步的
    }
    fallLeft () {
        this.fallAni(new Laya.Vector3(0, 0, 10), 9);       //异步的
    }
    fallRight () {
        this.fallAni(new Laya.Vector3(0, 0, -10), 9);       //异步的
    }
    fallUp_half (pivot: Laya.Vector3) {
        this.moveAni(pivot, new Laya.Vector3(-10, 0, 0), 9);
        this.fallAni(new Laya.Vector3(-10, 0, 0), 9);       //异步的
    }
    fallDown_half (pivot: Laya.Vector3) {
        this.moveAni(pivot, new Laya.Vector3(10, 0, 0), 9);
        this.fallAni(new Laya.Vector3(10, 0, 0), 9);       //异步的
    }
    fallLeft_half (pivot: Laya.Vector3) {
        this.moveAni(pivot, new Laya.Vector3(0, 0, 10), 9);
        this.fallAni(new Laya.Vector3(0, 0, 10), 9);       //异步的
    }
    fallRight_half (pivot: Laya.Vector3) {
        this.moveAni(pivot, new Laya.Vector3(0, 0, -10), 9);
        this.fallAni(new Laya.Vector3(0, 0, -10), 9);       //异步的
    }
    moveAni (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3, times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.myRotate(pivotVector, rotateVector);
            count++;
            if(count >= times){
                //旋转90度调用回调函数
                clearInterval(newTimer);
                this.updateCubePos();
                if (this.checkFall() === State.GAMING) {
                    this.checkMessageQueue();
                }
            }
        }, 1);
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
                this.updateCubePos();
                //游戏失败的处理
                console.log("fail");
            }
        }, 1);
    }
    fallStraightAni (times: number) {
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            this.cube.transform.position.y -= 0.2;
            count++;
            if(count >= times){
                clearInterval(newTimer);
                this.updateCubePos();
                //游戏胜利的处理
                console.log("success");
                //advance 红木时游戏失败的处理
            }
        }, 1);
    }
    doFall (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        this.myRotate(pivotVector, rotateVector);
        this.cube.transform.position.y -= 0.5;
    }
    myRotate (pivotVector: Laya.Vector3, rotateVector: Laya.Vector3) {
        //Laya的旋转机制有毒 自己写了cube旋转函数 支持翻转
        //pivotVector 是旋转轴
        //rotateVector 是旋转方向及角度
        let quaternion: Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(rotateVector.y / 180 * Math.PI, rotateVector.x / 180 * Math.PI, rotateVector.z / 180 * Math.PI, quaternion);
        
        //cube
        this.cube.transform.rotate(rotateVector, false, false);
        let oldposition_cube: Laya.Vector3 = new Laya.Vector3(this.cube.transform.position.x - pivotVector.x,
                                        this.cube.transform.position.y - pivotVector.y, this.cube.transform.position.z - pivotVector.z);
        let newposition_cube: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.transformQuat(oldposition_cube, quaternion, newposition_cube);
        this.cube.transform.position = new Laya.Vector3(newposition_cube.x + pivotVector.x,
                                        newposition_cube.y + pivotVector.y, newposition_cube.z + pivotVector.z);   
        
        this.updateLightPos();
    }
    updateLightPos () {
        //更新灯光位置
        //自发光
        this.light.transform.position = this.cube.transform.position;
        //视野聚光
        this.spotLight.transform.position = new Laya.Vector3(this.light.transform.position.x, this.light_height, this.light.transform.position.z);
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
    fall_full (dir: Direction) {
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
    fall_straight () {
        this.fallStraightAni(9);
    }
    checkFall (): State {
        //普通掉落
        let fall_1: boolean;
        let fall_2: boolean;
        if (this.cube1_pos.x >= this.MAX_WIDTH || this.cube1_pos.x < 0 || 
            this.cube1_pos.z >= this.MAX_LENGTH || this.cube1_pos.z < 0) {
                fall_1 = true;
        } else {
            fall_1 = (this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.EMPTY);
        }
        if (this.cube2_pos.x >= this.MAX_WIDTH || this.cube2_pos.x < 0 || 
            this.cube2_pos.z >= this.MAX_LENGTH || this.cube2_pos.z < 0) {
                fall_2 = true;
        } else {
            fall_2 = (this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.EMPTY);
        }
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

        //终点掉落
        let win_1: boolean = (this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.END);
        let win_2: boolean = (this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.END);
        if(win_1 === true && win_2 === true){
            this.fall_straight();
            return State.SUCCESS;
        }
        return State.GAMING;
    }
    addMessage (operation: Operation) {
        this.messageQueue.push(operation);
        if (!this.messageBusy) {
            this.messageBusy = true;
            this.checkMessageQueue();
        }
    }
    checkMessageQueue () {
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

    //test
    myAnimation (fn_action) {
        fn_action();
        //异步的
        let count = 0;
        let newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(() => {
            count++;
            if(1){
                //旋转90度调用回调函数
                clearInterval(newTimer);
                this.updateCubePos();
                
                this.checkMessageQueue();
                this.fallLeft();
            }
        }, 1);
    }
}