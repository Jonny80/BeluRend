import {Vector2} from "three";

export function lerp(a:number, b:number, t:number) {return a + (b - a) * t}
export function distance(a:number, b:number, t:number) {return (b - a) * t}
export function ease(t:number) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
export function recalculate(viewportHeight:number,viewportWidth:number,mouseX:number,mouseY:number) : Vector2{
    return new Vector2(viewportWidth/2*mouseX,viewportHeight/2*mouseY);
}