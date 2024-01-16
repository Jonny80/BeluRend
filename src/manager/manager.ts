import {Vector3} from "@react-three/fiber";

export default class Manager {
    public blobs:Vector3[] = [];
    public amount : number;
    public min : number;
    public max : number;
    constructor(min:number,max:number,amount:number) {
        this.amount = amount;
        this.min = min;
        this.max = max;
        for (let i = 0; i < amount; i++) {
            let randomPos = this.getRandompos(min,max)
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
        return [this.between(min,max),this.between(min,max),this.between(min,max)]
    }
}