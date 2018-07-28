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
        this.file = Laya.loader.getRes("res/map_" + this.filename + ".json");
        this.map = this.file["map"];
        this.size = [this.file["map_length"],this.file["map_width"]];
        this.pos = [this.file["startpos"],[this.file["startpos"][0]+1,this.file["startpos"][1]+1]];
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
            if(this.map[block[1]][block[0]] === Block.IRON)
                this.map[block[1]][block[0]] = Block.EMPTY;
            else if(this.map[block[1]][block[0]] === Block.EMPTY)
                this.map[block[1]][block[0]] = Block.IRON;
        }
    }
    update = () =>
    {
        //lose
        if(this.pos[0][0] < 0 || this.pos[1][0] > this.size[0] || this.pos[0][1] < 0 || this.pos[1][1] > this.size[1])
            return State.FAILURE;
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === Block.EMPTY || this.map[this.pos[0][1]][this.pos[0][0]] === Block.MUBAN))
            return State.FAILURE;
        if(!this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === Block.EMPTY || this.map[this.pos[1][1]-1][this.pos[1][0]-1] === Block.EMPTY))
            return State.FAILURE;
        //win
        if(this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] === Block.END)
            return State.SUCCESS;
        //trigger
        if(this.blockVertical && (this.map[this.pos[0][1]][this.pos[0][0]] === Block.LIGHT || this.map[this.pos[0][1]][this.pos[0][0]] === Block.HEAVY))
            this.trigger.apply(this.pos[0][0], this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[0][1]][this.pos[0][0]] ===Block.LIGHT)
            this.trigger.apply(this.pos[0][0],this.pos[0][1]);
        if(!this.blockVertical && this.map[this.pos[1][1]-1][this.pos[1][0]-1] === Block.LIGHT)
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




