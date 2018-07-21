const enum mapBlockType{empty, normal, red, oButton, xButton, end, metal};
class game{
    private file: Object;
    private filename: string;
    private map: Array<any>;
    private size: number[];
    private pos: Array<Array<number>>;
    private triggers: Array<any>;
    private blockVertical: Boolean;
    public stepcount: number;
    public timecount: number;
    constructor(fileName: string)
    { 
        this.filename = fileName;
        this.file = Laya.loader.getRes("res/" + this.filename + ".json");
        this.map = this.file["map"];
        this.size = [this.map[0].length, this.map.length];
        this.pos = this.file["startpos"];
        this.triggers = this.file["triggers"];
        this.blockVertical = true;
        this.stepcount = 0;
        this.timecount = 0;
    }
    public move(direction: Operation)
    {
        this.stepcount++;
        switch(direction)
        {
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
        //lose
        if(this.pos[0][0] < 0 || this.pos[1][0] > this.size[0] || this.pos[0][1] < 0 || this.pos[1][1] > this.size[1])
            return State.FAILURE;
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.empty || this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.red))
            return State.FAILURE;
        if(!this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.empty || this.map[this.pos[1][1]-1][this.pos[1][0]-1] === mapBlockType.empty))
            return State.FAILURE;
        //win
        if(this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.end)
            return State.SUCCESS;
        //trigger
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.oButton || this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.xButton))
            this.trigger.apply(this.pos[0][0], this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] === mapBlockType.oButton)
            this.trigger.apply(this.pos[0][0],this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[1][1]-1][this.pos[1][0]-1] === mapBlockType.oButton)
            this.trigger.apply(this.pos[1][0]-1,this.pos[1][1]-1);
        //continue
        return State.GAMING;
    }
    moveleft = () =>
    {
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




