//view.ts负责游戏中的所有的元素显示、运动效果和与此相关的部分逻辑
//GameView类的一个实例对象就是一个游戏关卡
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
;
var Operation;
(function (Operation) {
    Operation[Operation["UP"] = 0] = "UP";
    Operation[Operation["DOWN"] = 1] = "DOWN";
    Operation[Operation["LEFT"] = 2] = "LEFT";
    Operation[Operation["RIGHT"] = 3] = "RIGHT";
})(Operation || (Operation = {}));
;
var Block;
(function (Block) {
    Block[Block["EMPTY"] = 0] = "EMPTY";
    Block[Block["ORDINARY"] = 1] = "ORDINARY";
    Block[Block["IRON"] = 2] = "IRON";
    Block[Block["MUBAN"] = 3] = "MUBAN";
    Block[Block["LIGHT"] = 4] = "LIGHT";
    Block[Block["HEAVY"] = 5] = "HEAVY";
    Block[Block["FLASH"] = 6] = "FLASH";
    Block[Block["END"] = 7] = "END";
})(Block || (Block = {}));
;
var State;
(function (State) {
    State[State["GAMING"] = 0] = "GAMING";
    State[State["SUCCESS"] = 1] = "SUCCESS";
    State[State["FAILURE"] = 2] = "FAILURE";
})(State || (State = {}));
;
var GameView = /** @class */ (function () {
    function GameView(gate_file) {
        //构造函数
        //添加3D场景
        this.scene = Laya.stage.addChild(new Laya.Scene());
        //添加照相机
        var camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100)));
        camera.transform.translate(new Laya.Vector3(-5, 6, 20));
        camera.transform.rotate(new Laya.Vector3(-5, -30, 0), true, false);
        camera.clearColor = null;
        //初始化类成员变量
        this.messageQueue = new Array();
        this.messageBusy = false;
        //调用loadView函数加载场景内容
        Laya.loader.load(gate_file, Laya.Handler.create(this, this.loadView, [gate_file]), null, Laya.Loader.JSON);
    }
    /**loadView加载场景内容相关函数 代码块开始 */
    GameView.prototype.loadView = function (gate_file) {
        //读取关卡文件
        var json_info = Laya.Loader.getRes(gate_file);
        //初始化类成员变量
        //灯光
        this.light_range = 3;
        this.light_height = 3;
        this.light_global_on = json_info["light_on"];
        //资源url
        this.BLOCK_URL = json_info["url_block"];
        this.BLOCK_IRON_URL = json_info["url_iron"];
        this.BLOCK_MUBAN_URL = json_info["url_muban"];
        this.CUBE_URL = json_info["url_cube"];
        //地图
        this.map_info = json_info["map"];
        this.MAX_LENGTH = json_info["map_length"]; //上下
        this.MAX_WIDTH = json_info["map_width"]; //左右 
        this.start_pos = json_info["startpos"];
        //元素位置信息
        this.cube_pos_init = new Laya.Vector3(this.start_pos[0], 0, this.start_pos[1]);
        this.cube1_pos = new Laya.Vector3(this.cube_pos_init.x, this.cube_pos_init.y, this.cube_pos_init.z);
        this.cube2_pos = new Laya.Vector3(this.cube_pos_init.x, this.cube_pos_init.y + 1, this.cube_pos_init.z);
        //加入各元素
        if (this.light_global_on) {
            this.loadDirectionLight();
        }
        this.loadMap();
        this.loadCube();
        this.loadSelfLight();
        this.loadSpotLight();
        this.updateLightPos();
    };
    GameView.prototype.loadMap = function () {
        //一些常数
        var block_depth = 0.1; //地块厚度
        //地块材质
        var material_block = new Laya.StandardMaterial();
        material_block.diffuseTexture = Laya.Texture2D.load(this.BLOCK_URL);
        var material_iron = new Laya.StandardMaterial();
        material_iron.diffuseTexture = Laya.Texture2D.load(this.BLOCK_IRON_URL);
        var material_muban = new Laya.StandardMaterial();
        material_muban.diffuseTexture = Laya.Texture2D.load(this.BLOCK_MUBAN_URL);
        //添加地形
        this.map = new Array();
        for (var i = 0; i < this.MAX_WIDTH; i++) {
            this.map[i] = new Array();
            for (var j = 0; j < this.MAX_LENGTH; j++) {
                switch (this.map_info[j][i]) {
                    case Block.EMPTY:
                        //无地块
                        break;
                    case Block.ORDINARY:
                        //普通地块
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, block_depth)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
                        this.map[i][j].meshRender.material = material_block;
                        break;
                    case Block.IRON:
                        //机关地块
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
                        this.map[i][j].meshRender.material = material_iron;
                        break;
                    case Block.MUBAN:
                        //木地块
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
                        this.map[i][j].meshRender.material = material_muban;
                        break;
                    case Block.LIGHT:
                        //轻压机关
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
                        this.map[i][j].meshRender.material = material_block;
                        break;
                    case Block.HEAVY:
                        //重压机关
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
                        this.map[i][j].meshRender.material = material_block;
                        break;
                    case Block.FLASH:
                        //分身机关
                        this.map[i][j] = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.1)));
                        this.map[i][j].transform.translate(new Laya.Vector3(i, -1 - block_depth / 2, j), true);
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
    };
    GameView.prototype.loadCube = function () {
        //cube
        this.cube = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 2)));
        var material_cube = new Laya.StandardMaterial();
        material_cube.diffuseTexture = Laya.Texture2D.load(this.CUBE_URL); //贴纸
        material_cube.albedo = new Laya.Vector4(6, 6, 6, 0.9); //透明效果
        material_cube.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        this.cube.meshRender.material = material_cube;
        var fall_height = 10;
        this.cube.transform.position = new Laya.Vector3(this.cube_pos_init.x, fall_height, this.cube_pos_init.z); //初始位置 
        this.fall_in(fall_height);
    };
    GameView.prototype.loadSelfLight = function () {
        //自发光
        this.light = this.scene.addChild(new Laya.PointLight());
        this.light.range = this.light_range;
        this.light.attenuation = new Laya.Vector3(0.4, 0.4, 0.4); //衰减效果
    };
    GameView.prototype.loadSpotLight = function () {
        //范围聚光
        this.spotLight = this.scene.addChild(new Laya.SpotLight());
        this.spotLight.direction = new Laya.Vector3(0, -1, 0);
        this.spotLight.range = 100;
        this.spotLight.spot = 12;
        this.spotLight.attenuation = new Laya.Vector3(0.01, 0.01, 0.01);
    };
    GameView.prototype.loadDirectionLight = function () {
        //添加方向光
        this.directionLight = this.scene.addChild(new Laya.DirectionLight());
        this.directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        this.directionLight.direction = new Laya.Vector3(0, -1, 0);
    };
    /**loadView加载场景内容相关函数 代码块结束 */
    /**cube动作相关接口函数 代码块开始 目前12个动作 */
    GameView.prototype.moveUp = function () {
        var up_pivot = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.min(this.cube1_pos.z, this.cube2_pos.z) - 0.5);
        this.lastMove = Direction.UP;
        this.moveAni(up_pivot, new Laya.Vector3(-10, 0, 0), 9); //异步的
    };
    GameView.prototype.moveDown = function () {
        var down_pivot = new Laya.Vector3((this.cube1_pos.x + this.cube2_pos.x) / 2, -1, Math.max(this.cube1_pos.z, this.cube2_pos.z) + 0.5);
        this.lastMove = Direction.DOWN;
        this.moveAni(down_pivot, new Laya.Vector3(10, 0, 0), 9); //异步的
    };
    GameView.prototype.moveLeft = function () {
        var left_pivot = new Laya.Vector3(Math.min(this.cube1_pos.x, this.cube2_pos.x) - 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.LEFT;
        this.moveAni(left_pivot, new Laya.Vector3(0, 0, 10), 9); //异步的
    };
    GameView.prototype.moveRight = function () {
        var right_pivot = new Laya.Vector3(Math.max(this.cube1_pos.x, this.cube2_pos.x) + 0.5, -1, (this.cube1_pos.z + this.cube2_pos.z) / 2);
        this.lastMove = Direction.RIGHT;
        this.moveAni(right_pivot, new Laya.Vector3(0, 0, -10), 9); //异步的
    };
    GameView.prototype.fallUp = function () {
        this.fallAni(new Laya.Vector3(-10, 0, 0), 9); //异步的
    };
    GameView.prototype.fallDown = function () {
        this.fallAni(new Laya.Vector3(10, 0, 0), 9); //异步的
    };
    GameView.prototype.fallLeft = function () {
        this.fallAni(new Laya.Vector3(0, 0, 10), 9); //异步的
    };
    GameView.prototype.fallRight = function () {
        this.fallAni(new Laya.Vector3(0, 0, -10), 9); //异步的
    };
    GameView.prototype.fallUp_half = function (pivot) {
        this.moveAni(pivot, new Laya.Vector3(-10, 0, 0), 9);
        this.fallAni(new Laya.Vector3(-10, 0, 0), 9); //异步的
    };
    GameView.prototype.fallDown_half = function (pivot) {
        this.moveAni(pivot, new Laya.Vector3(10, 0, 0), 9);
        this.fallAni(new Laya.Vector3(10, 0, 0), 9); //异步的
    };
    GameView.prototype.fallLeft_half = function (pivot) {
        this.moveAni(pivot, new Laya.Vector3(0, 0, 10), 9);
        this.fallAni(new Laya.Vector3(0, 0, 10), 9); //异步的
    };
    GameView.prototype.fallRight_half = function (pivot) {
        this.moveAni(pivot, new Laya.Vector3(0, 0, -10), 9);
        this.fallAni(new Laya.Vector3(0, 0, -10), 9); //异步的
    };
    /**cube动作相关接口函数 代码块结束 */
    /**cube动作接口函数调用的动画函数 代码块开始 */
    GameView.prototype.moveAni = function (pivotVector, rotateVector, times) {
        var _this = this;
        //异步的
        var count = 0;
        var newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(function () {
            _this.doRotate(pivotVector, rotateVector);
            count++;
            if (count >= times) {
                //旋转90度调用回调函数
                clearInterval(newTimer);
                _this.updateCubePos();
                if (_this.checkFall() === State.GAMING) {
                    _this.checkMessageQueue();
                }
            }
        }, 1);
    };
    GameView.prototype.fallAni = function (rotateVector, times) {
        var _this = this;
        //异步的
        var count = 0;
        var newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(function () {
            _this.doFall(_this.cube.transform.position, rotateVector);
            count++;
            if (count >= times) {
                clearInterval(newTimer);
                _this.updateCubePos();
                //游戏失败的处理
                console.log("fail");
            }
        }, 1);
    };
    GameView.prototype.fallStraightAni = function (rate, times) {
        var _this = this;
        //异步的
        var count = 0;
        var newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(function () {
            _this.dofallStraight(rate);
            count++;
            if (count >= times) {
                clearInterval(newTimer);
                _this.updateCubePos();
                //游戏胜利的处理
                console.log("success");
                //advance 红木时游戏失败的处理
            }
        }, 1);
    };
    GameView.prototype.fallInAni = function (rate, times) {
        var _this = this;
        //异步的
        var count = 0;
        var newTimer = null;
        clearInterval(newTimer);
        newTimer = setInterval(function () {
            _this.dofallStraight(rate);
            count++;
            if (count >= times) {
                clearInterval(newTimer);
            }
        }, 1);
    };
    /**cube动作接口函数调用的动画函数 代码块结束 */
    /**cube动作接口函数调用的动画函数调用的分解动作函数 代码块开始 */
    GameView.prototype.doFall = function (pivotVector, rotateVector) {
        this.myRotate(pivotVector, rotateVector);
        this.myFallStraight(0.5);
        this.updateLightPos();
    };
    GameView.prototype.doRotate = function (pivotVector, rotateVector) {
        this.myRotate(pivotVector, rotateVector);
        this.updateLightPos();
    };
    GameView.prototype.dofallStraight = function (rate) {
        this.myFallStraight(rate);
        this.updateLightPos();
    };
    /**cube动作接口函数调用的动画函数调用的分解动作函数 代码块结束 */
    /**cube动作接口函数调用的动画函数调用的分解动作函数调用的原子动作函数 代码块开始 */
    GameView.prototype.myFallStraight = function (rate) {
        this.cube.transform.position = new Laya.Vector3(this.cube.transform.position.x, this.cube.transform.position.y - rate, this.cube.transform.position.z);
    };
    GameView.prototype.myRotate = function (pivotVector, rotateVector) {
        //Laya的旋转机制有毒 自己写了cube旋转函数 支持翻转
        //pivotVector 是旋转轴
        //rotateVector 是旋转方向及角度
        var quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(rotateVector.y / 180 * Math.PI, rotateVector.x / 180 * Math.PI, rotateVector.z / 180 * Math.PI, quaternion);
        //cube
        this.cube.transform.rotate(rotateVector, false, false);
        var oldposition_cube = new Laya.Vector3(this.cube.transform.position.x - pivotVector.x, this.cube.transform.position.y - pivotVector.y, this.cube.transform.position.z - pivotVector.z);
        var newposition_cube = new Laya.Vector3();
        Laya.Vector3.transformQuat(oldposition_cube, quaternion, newposition_cube);
        this.cube.transform.position = new Laya.Vector3(newposition_cube.x + pivotVector.x, newposition_cube.y + pivotVector.y, newposition_cube.z + pivotVector.z);
    };
    GameView.prototype.updateLightPos = function () {
        //更新灯光位置
        //自发光
        this.light.transform.position = this.cube.transform.position;
        //视野聚光
        this.spotLight.transform.position = new Laya.Vector3(this.light.transform.position.x, this.light_height, this.light.transform.position.z);
    };
    GameView.prototype.updateCubePos = function () {
        //四舍五入修正坐标 尚未矫正偏角 不过实际效果偏角误差观察不出
        var cube_x = Math.round(this.cube.transform.position.x * 2) / 2;
        var cube_y = Math.round(this.cube.transform.position.y * 2) / 2;
        var cube_z = Math.round(this.cube.transform.position.z * 2) / 2;
        this.cube.transform.position = new Laya.Vector3(cube_x, cube_y, cube_z);
        this.updateLightPos();
        //获取新的cube两方块位置
        var center_x = Math.floor(cube_x);
        var center_z = Math.floor(cube_z);
        if (center_x === cube_x && center_z === cube_z) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(center_x, 1, center_z);
        }
        else if (center_x === cube_x) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(center_x, 0, cube_z * 2 - center_z);
        }
        else if (center_z === cube_z) {
            this.cube1_pos = new Laya.Vector3(center_x, 0, center_z);
            this.cube2_pos = new Laya.Vector3(cube_x * 2 - center_x, 0, center_z);
        }
        else {
            //异常处理
            console.log("updateCubePos需要异常处理！");
        }
    };
    /**cube动作接口函数调用的动画函数调用的分解动作函数调用的原子动作函数 代码块结束 */
    /**对cube动作接口函数的逻辑运用 代码块开始 */
    GameView.prototype.fall_full = function (dir) {
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
    };
    GameView.prototype.fall_half = function (pos_empty, pos_safe) {
        if (pos_empty.x > pos_safe.x) {
            var pivot = new Laya.Vector3(pos_empty.x - 0.5, -1, pos_empty.z);
            this.fallRight_half(pivot);
        }
        else if (pos_empty.x < pos_safe.x) {
            var pivot = new Laya.Vector3(pos_empty.x + 0.5, -1, pos_empty.z);
            this.fallLeft_half(pivot);
        }
        else if (pos_empty.z > pos_safe.z) {
            var pivot = new Laya.Vector3(pos_empty.x, -1, pos_empty.z - 0.5);
            this.fallDown_half(pivot);
        }
        else if (pos_empty.z < pos_safe.z) {
            var pivot = new Laya.Vector3(pos_empty.x, -1, pos_empty.z + 0.5);
            this.fallUp_half(pivot);
        }
        else {
            //异常处理
            console.log("fall_half需要异常处理！");
        }
    };
    GameView.prototype.fall_straight = function () {
        this.fallStraightAni(0.2, 9);
    };
    GameView.prototype.fall_in = function (height) {
        this.fallInAni(1, height);
    };
    GameView.prototype.checkFall = function () {
        //普通掉落
        var fall_1;
        var fall_2;
        if (this.cube1_pos.x >= this.MAX_WIDTH || this.cube1_pos.x < 0 ||
            this.cube1_pos.z >= this.MAX_LENGTH || this.cube1_pos.z < 0) {
            fall_1 = true;
        }
        else {
            fall_1 = (this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.EMPTY);
        }
        if (this.cube2_pos.x >= this.MAX_WIDTH || this.cube2_pos.x < 0 ||
            this.cube2_pos.z >= this.MAX_LENGTH || this.cube2_pos.z < 0) {
            fall_2 = true;
        }
        else {
            fall_2 = (this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.EMPTY);
        }
        if (fall_1 === true && fall_2 === true) {
            this.fall_full(this.lastMove);
            return State.FAILURE;
        }
        else if (fall_1 === true) {
            this.fall_half(this.cube1_pos, this.cube2_pos);
            return State.FAILURE;
        }
        else if (fall_2 === true) {
            this.fall_half(this.cube2_pos, this.cube1_pos);
            return State.FAILURE;
        }
        //红木掉落
        //终点掉落
        var win_1 = (this.map_info[this.cube1_pos.z][this.cube1_pos.x] === Block.END);
        var win_2 = (this.map_info[this.cube2_pos.z][this.cube2_pos.x] === Block.END);
        if (win_1 === true && win_2 === true) {
            this.fall_straight();
            return State.SUCCESS;
        }
        return State.GAMING;
    };
    /**对cube动作接口函数的逻辑运用 代码块结束 */
    /**消息机制 代码块开始 */
    GameView.prototype.addMessage = function (operation) {
        this.messageQueue.push(operation);
        if (!this.messageBusy) {
            this.messageBusy = true;
            this.checkMessageQueue();
        }
    };
    GameView.prototype.checkMessageQueue = function () {
        if (this.messageQueue.length === 0) {
            this.messageBusy = false;
            return;
        }
        else {
            var nextOperation = this.messageQueue.shift();
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
    };
    return GameView;
}());
//# sourceMappingURL=view.js.map