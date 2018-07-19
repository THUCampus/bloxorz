;
var game = /** @class */ (function () {
    function game(fileName) {
        var _this = this;
        this.trigger = function (posx, posy) {
            var i = 0;
            while (!(_this.triggers[i].pos[0] === posx && _this.triggers[i].pos[1] === posy))
                i++;
            for (var block in _this.triggers[i].blocks) {
                if (_this.map[block[1]][block[0]] === 0)
                    _this.map[block[1]][block[0]] = 6 /* metal */;
                else if (_this.map[block[1]][block[0]] === 6 /* metal */)
                    _this.map[block[1]][block[0]] = 0;
            }
        };
        this.update = function () {
            //lose
            if (_this.pos[0][0] < 0 || _this.pos[1][0] > _this.size[0] || _this.pos[0][1] < 0 || _this.pos[1][1] > _this.size[1])
                return 0;
            if (_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === 0 /* empty */ || _this.map[_this.pos[0][1]][_this.pos[0][0]] === 2 /* red */))
                return 0;
            if (!_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === 0 /* empty */ || _this.map[_this.pos[1][1] - 1][_this.pos[1][0] - 1] === 0 /* empty */))
                return 0;
            //win
            if (_this.blockVertical && _this.map[_this.pos[0][1]][_this.pos[0][0]] === 5 /* end */)
                return 2;
            //trigger
            if (_this.blockVertical && (_this.map[_this.pos[0][1]][_this.pos[0][0]] === 3 /* oButton */ || _this.map[_this.pos[0][1]][_this.pos[0][0]] === 4 /* xButton */))
                _this.trigger.apply(_this.pos[0][0], _this.pos[0][1]);
            if (!_this.blockVertical && _this.map[_this.pos[0][1]][_this.pos[0][0]] === 3 /* oButton */)
                _this.trigger.apply(_this.pos[0][0], _this.pos[0][1]);
            if (!_this.blockVertical && _this.map[_this.pos[1][1] - 1][_this.pos[1][0] - 1] === 3 /* oButton */)
                _this.trigger.apply(_this.pos[1][0] - 1, _this.pos[1][1] - 1);
            //continue
            return 1;
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
        this.file = Laya.loader.getRes("res/" + this.filename + ".json");
        this.map = this.file["map"];
        this.size = [this.map[0].length, this.map.length];
        this.pos = this.file["startpos"];
        this.triggers = this.file["triggers"];
        this.blockVertical = true;
    }
    game.prototype.move = function (direction) {
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