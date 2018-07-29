var game = /** @class */ (function () {
    function game(fileName) {
        var _this = this;
        this.trigger = function (posx, posy) {
            var i = 0;
            while (!(_this.triggers[i].pos[0] === posx && _this.triggers[i].pos[1] === posy))
                i++;
            for (var block in _this.triggers[i].blocks) {
                if (_this.map[block[1]][block[0]] === Block.IRON)
                    _this.map[block[1]][block[0]] = Block.EMPTY;
                else if (_this.map[block[1]][block[0]] === Block.EMPTY)
                    _this.map[block[1]][block[0]] = Block.IRON;
            }
        };
        this.update = function () {
            //lose
            if (_this.pos[0][0] < 0 || _this.pos[1][0] > _this.size[0] || _this.pos[0][1] < 0 || _this.pos[1][1] > _this.size[1])
                return State.FAILURE;
            if (_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.EMPTY || _this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.MUBAN))
                return State.FAILURE;
            if (!_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.EMPTY || _this.map[_this.pos[1][1] - 1][_this.pos[1][0] - 1] === Block.EMPTY))
                return State.FAILURE;
            //win
            if (_this.blockVertical && _this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.END)
                return State.SUCCESS;
            //trigger
            if (_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.LIGHT || _this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.HEAVY))
                _this.trigger.apply(_this.pos[0][0], _this.pos[0][1]);
            if (!_this.blockVertical && _this.map[_this.pos[0][1]][_this.pos[0][0]] === Block.LIGHT)
                _this.trigger.apply(_this.pos[0][0], _this.pos[0][1]);
            if (!_this.blockVertical && _this.map[_this.pos[1][1] - 1][_this.pos[1][0] - 1] === Block.LIGHT)
                _this.trigger.apply(_this.pos[1][0] - 1, _this.pos[1][1] - 1);
            //continue
            return State.GAMING;
        };
        this.moveleft = function () {
            if (_this.blockVertical) {
                _this.blockVertical = false;
                _this.pos[0][0] -= 2;
                _this.pos[1][0] -= 1;
            }
            else {
                if (_this.pos[1][0] - _this.pos[0][0] === 2) {
                    _this.blockVertical = true;
                    _this.pos[0][0] -= 1;
                    _this.pos[1][0] -= 2;
                }
                else {
                    _this.pos[0][0] -= 1;
                    _this.pos[1][0] -= 1;
                }
            }
            console.log(_this.pos.toString());
        };
        this.moveright = function () {
            if (_this.blockVertical) {
                _this.blockVertical = false;
                _this.pos[0][0] += 1;
                _this.pos[1][0] += 2;
            }
            else {
                if (_this.pos[1][0] - _this.pos[0][0] === 2) {
                    _this.blockVertical = true;
                    _this.pos[0][0] += 2;
                    _this.pos[1][0] += 1;
                }
                else {
                    _this.pos[0][0] += 1;
                    _this.pos[1][0] += 1;
                }
            }
            console.log(_this.pos.toString());
        };
        this.moveup = function () {
            if (_this.blockVertical) {
                _this.blockVertical = false;
                _this.pos[0][1] -= 2;
                _this.pos[1][1] -= 1;
            }
            else {
                if (_this.pos[1][1] - _this.pos[0][1] === 2) {
                    _this.blockVertical = true;
                    _this.pos[0][1] -= 1;
                    _this.pos[1][1] -= 2;
                }
                else {
                    _this.pos[0][1] -= 1;
                    _this.pos[1][1] -= 1;
                }
            }
            console.log(_this.pos.toString());
        };
        this.movedown = function () {
            if (_this.blockVertical) {
                _this.blockVertical = false;
                _this.pos[0][1] += 1;
                _this.pos[1][1] += 2;
            }
            else {
                if (_this.pos[1][1] - _this.pos[0][1] === 2) {
                    _this.blockVertical = true;
                    _this.pos[0][1] += 2;
                    _this.pos[1][1] += 1;
                }
                else {
                    _this.pos[0][1] += 1;
                    _this.pos[1][1] += 1;
                }
            }
            console.log(_this.pos.toString());
        };
        this.filename = fileName;
        this.file = Laya.loader.getRes("res/map_" + this.filename + ".json");
        this.map = this.file["map"];
        this.size = [this.file["map_length"], this.file["map_width"]];
        this.pos = [this.file["startpos"], [this.file["startpos"][0] + 1, this.file["startpos"][1] + 1]];
        this.triggers = this.file["triggers"];
        this.blockVertical = true;
        this.stepcount = 0;
        this.timecount = 0;
    }
    game.prototype.move = function (direction) {
        this.stepcount++;
        switch (direction) {
            case Operation.UP:
                this.moveup.apply(null);
                break;
            case Operation.DOWN:
                this.movedown.apply(null);
                break;
            case Operation.LEFT:
                this.moveleft.apply(null);
                break;
            case Operation.RIGHT:
                this.moveright.apply(null);
                break;
        }
        return this.update.apply(null);
    };
    return game;
}());
//# sourceMappingURL=game.js.map