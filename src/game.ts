const enum mapBlockType{empty, normal, red, oButton, xButton, end, metal};
class game{
    private file: Object;
    private filename: string;
    private map: Array<any>;
    private size: number[];
    private pos: Array<Array<number>>;
    private triggers: Array<any>;
    private blockVertical: Boolean;
    constructor(fileName: string)
    {
        this.filename = fileName;
        this.file = Laya.loader.getRes("res/" + this.filename + ".json");
        this.map = this.file["map"];
        this.size = [this.map[0].length, this.map.length];
        this.pos = this.file["startpos"];
        this.triggers = this.file["triggers"];
        this.blockVertical = true;
    }
    public move(direction: Number)
    {
        switch(direction)
        {
            case 1:
                this.moveup.apply(null);
                break;
            case 2:
                this.movedown.apply(null);
                break;
            case 3:
                this.moveleft.apply(null);
                break;
            case 4:
                this.moveright.apply(null);
                break; 
        }
        return this.update.apply(null);
    }
    trigger = (posx,posy) =>
    {
        let i = 0;
        while(!(this.triggers[i].pos[0] === posx && this.triggers[i].pos[1] === posy))
            i++;
        for (let block in this.triggers[i].blocks) {
            if(this.map[block[1]][block[0]] === 0)
                this.map[block[1]][block[0]] = mapBlockType.metal;
            else if(this.map[block[1]][block[0]] === mapBlockType.metal)
                this.map[block[1]][block[0]] = 0;
        }
    }
    update = () =>
    {
        //win
        if(this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.end)
            return 2;
        //lose
        if(this.pos[0][0] < 0 || this.pos[1][0] > this.size[0] || this.pos[0][1] < 0 || this.pos[1][1] > this.size[1])
            return 0;
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.empty || this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.red))
            return 0;
        if(!this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.empty || this.map[this.pos[1][1]-1][this.pos[1][0]-1] === mapBlockType.empty))
            return 0;
        //trigger
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.oButton || this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.xButton))
            this.trigger.apply(this.pos[0][0], this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.oButton)
            this.trigger.apply(this.pos[0][0],this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[1][1]-1][this.pos[1][0]-1] === mapBlockType.oButton)
            this.trigger.apply(this.pos[1][0]-1,this.pos[1][1]-1);
        //continue
        return 1;
    }
    moveleft = () =>
    {
        console.log();
        if(this.blockVertical)
        {
            this.blockVertical = false;
            this.pos[0][0] -= 2;
            this.pos[1][0] -= 1;
        }
        else
        {
            if(this.pos[1][0] - this.pos[0][0] === 2)
            {
                this.blockVertical = true;
                this.pos[0][0] -= 1;
                this.pos[1][0] -= 2;
            }
            else
            {
                this.pos[0][0] -= 1;
                this.pos[1][0] -= 1;
            }
        }
        console.log(this.pos.toString());
    }
    moveright = () =>
    {
        if(this.blockVertical)
        {
            this.blockVertical = false;
            this.pos[0][0] += 1;
            this.pos[1][0] += 2;
        }
        else
        {
            if(this.pos[1][0] - this.pos[0][0] === 2)
            {
                this.blockVertical = true;
                this.pos[0][0] += 2;
                this.pos[1][0] += 1;
            }
            else
            {
                this.pos[0][0] += 1;
                this.pos[1][0] += 1;
            }
        }
        console.log(this.pos.toString());
    }
    moveup = () =>
    {
        if(this.blockVertical)
        {
            this.blockVertical = false;
            this.pos[0][1] -= 2;
            this.pos[1][1] -= 1;
        }
        else
        {
            if(this.pos[1][1] - this.pos[0][1] === 2)
            {
                this.blockVertical = true;
                this.pos[0][1] -= 1;
                this.pos[1][1] -= 2;
            }
            else
            {
                this.pos[0][1] -= 1;
                this.pos[1][1] -= 1;
            }
        }
        console.log(this.pos.toString());
    }
    movedown = () =>
    {
        if(this.blockVertical)
        {
            this.blockVertical = false;
            this.pos[0][1] += 1;
            this.pos[1][1] += 2;
        }
        else
        {
            if(this.pos[1][1] - this.pos[0][1] === 2)
            {
                this.blockVertical = true;
                this.pos[0][1] += 2;
                this.pos[1][1] += 1;
            }
            else
            {
                this.pos[0][1] += 1;
                this.pos[1][1] += 1;
            }
        }
        console.log(this.pos.toString());
    }
}




