import {Vector2, Vector3} from "three";

export default class Manager {
    public blobs:Vector3[] = [];
    public amount : number;
    public min : number;
    public max : number;
    public withDepth:boolean;
    constructor(min:number,max:number,amount:number,withDepth=false) {
        this.amount = amount;
        this.min = min;
        this.max = max;
        this.withDepth = withDepth;
        for (let i = 0; i < amount; i++) {
            let randomPos:Vector3 = this.getRandompos(min,max)
            this.blobs.push(randomPos);
        }
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