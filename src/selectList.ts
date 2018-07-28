module myUI{
    export class SelectList {
        public selectListUI: ui.select_listUI;
        public list: Laya.List;
        public levels_file: string;
        public levels: JSON;
        public parent: MenuView;
        constructor (parent: MenuView) {
            this.parent = parent;
            this.selectListUI = new ui.select_listUI();
            this.list = new Laya.List();
            this.selectListUI.addChild(this.list);

            this.list.itemRender = Item;

            this.list.repeatX = 5;
            this.list.repeatY = 2;

            this.list.vScrollBarSkin = "";

            this.list.selectEnable = true;
            this.list.selectHandler = new Laya.Handler(this, this.onSelect);

            this.list.renderHandler = new Laya.Handler(this, this.upDateItem);

            this.levels_file = 'res/levels.json';
            let res: Array<any> = [{url: this.levels_file, type: Laya.Loader.JSON}];
            Laya.loader.load(res, Laya.Handler.create(this, this.update), null);
        }
        update (): void{
            this.levels = Laya.loader.getRes(this.levels_file);
            let defaultExist: boolean = false;
            let data: Array<Array<number>> = [];
            let i: number;
            for (i = 1; i < this.levels['total_level']; i++) {
                if (!defaultExist && this.levels['levels'][i] === -1) {
                    defaultExist = true;
                    this.parent.setCurrentLevel(i-1);
                }
                data.push([i, this.levels['levels'][i]]);
            }
            this.list.array = data;
            if (!defaultExist) {
                this.parent.setCurrentLevel(i-1);
            }
        }
        upDateItem (cell: Item, index: number): void{
            if (index === this.parent.getCurrentLevel() - 1) {
                cell.setImg(cell.dataSource, true);
            } else {
                cell.setImg(cell.dataSource, false);
            }
        }
        onSelect (index: number): void{
            index++;
            if (this.levels['levels'][index] === -1) {
                return;
            }
            this.parent.setCurrentLevel(index);
        }
    }

    class Item extends Laya.Box {
        public static WID: number = 180;
        public static HEI: number = 180;
        public static NUMBER_WID: number = 60;
        public static NUMBER_HEI: number = 100;
        public static STAR_WID: number = 30;
        public static STAR_HEI: number = 30;
        public static STAR_NUM: number = 3;
        public static CURSOR_WID: number = 140;
        public static CURSOR_HEI: number = 140;
        private img_n1: Laya.Image;
        private img_n2: Laya.Image;
        private img_s: Array<Laya.Image>;
        private img_c: Laya.Image;
        constructor(){
            super();
            this.size(Item.WID, Item.HEI);

            this.img_n1 = new Laya.Image();
            this.img_n1.x = Item.WID/2 - Item.NUMBER_WID;
            this.img_n1.size(Item.NUMBER_WID, Item.NUMBER_HEI);
            this.addChild(this.img_n1);

            this.img_n2 = new Laya.Image();
            this.img_n2.x = Item.WID/2;
            this.img_n2.size(Item.NUMBER_WID, Item.NUMBER_HEI);
            this.addChild(this.img_n2);

            this.img_s = new Array<Laya.Image>();
            let x_0: number = (Item.WID - Item.STAR_NUM * Item.STAR_WID) / 2;
            for (let i = 0; i < Item.STAR_NUM; i++) {
                let newImage = new Laya.Image();
                newImage.x = x_0 + i * Item.STAR_WID;
                newImage.y = Item.NUMBER_HEI;
                newImage.size(Item.STAR_WID, Item.STAR_HEI);
                this.img_s.push(newImage);
                this.addChild(this.img_s[i]);
            }

            this.img_c = new Laya.Image();
            this.img_c.x = (Item.WID - Item.CURSOR_WID) / 2;
            this.img_c.size(Item.CURSOR_WID, Item.CURSOR_HEI);
            this.addChild(this.img_c);
        }
        public setImg(index: Array<number>, iscurrentLevel: boolean): void {
            this.img_n1.skin = this.indexToString_num(Math.floor(index[0] / 10));
            this.img_n2.skin = this.indexToString_num(index[0] % 10);

            if (index[1] === -1) {
                this.img_s[Math.floor(Item.STAR_NUM/2)].skin = 'itemres/locked.png';
            } else {
                let i = 0;
                for (i = 0; i < index[1]; i++) {
                    this.img_s[i].skin = this.indexToString_star(1);
                }
                for (i; i < Item.STAR_NUM; i++) {
                    this.img_s[i].skin = this.indexToString_star(0);
                }
            }

            if (iscurrentLevel) {
                this.img_c.skin = 'itemres/cursor.png';
            } else {
                this.img_c.skin = null;
            }
        }
        public indexToString_num(index: number): string{
            return 'itemres/number_' + index.toString() + '.png';
        }
        public indexToString_star(index: number): string{
            return 'itemres/star_' + index.toString() + '.png';
        }
    }
}