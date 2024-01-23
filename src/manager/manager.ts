import { Vector3} from "three";

export default class Manager {
    public blobs:Vector3[] = [];
    public amount : number;
    public min : number;
    public max : number;
    public withDepth:boolean;
    public map = new Map();
    constructor(min:number,max:number,amount:number,withDepth=false) {
        console.log("init new manager")
        this.amount = amount;
        this.min = min;
        this.max = max;
        this.withDepth = withDepth;
        for (let i = 0; i < amount; i++) {
            let randomPos:Vector3 = this.getRandompos(min,max)
            this.map.set(Math.round(randomPos.x),Math.round(randomPos.y))
            this.blobs.push(randomPos);
        }
    }

    addVector(vec:Vector3,vec2:Vector3){
        // @ts-ignore
        let newVec:Vector3 = [vec[0]+vec2[0],vec[0]+vec2[0],vec[0]+vec2[0]]
        return newVec
    }

    changeAmount(newAmount:number){
        if (newAmount > this.amount){
            for (let i = 0; i < (newAmount-this.amount); i++) {
                let randomPos = this.getRandompos(this.min,this.max)
                this.blobs.push(randomPos);
            }
            return
        }
        if (newAmount === this.amount) return;
        for (let i = 0; i < (this.amount - newAmount); i++) {
            this.blobs.pop()
        }
        return
    }

    between(min:number, max:number) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
    // @ts-ignore
    getRandompos(min:number, max:number):Vector3{
        return new Vector3(this.between(min,max),this.between(min,max),this.withDepth ? this.between(min,max):0);
    }
}