import Manager from "../manager/manager.ts";
import {Particle} from "./Particle.tsx";
import {MutableRefObject, useRef} from "react";
import {Group, MathUtils, Object3D, Object3DEventMap, Vector2, Vector3} from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {distance, ease, lerp, recalculate} from "../Utils/utils.ts";

const manager= new Manager(-25,25,500)
const FACTOR_GRAV = 0.1;
export default function Simulation(){

    const ref = useRef<Group>(null)

    const {viewport} = useThree();

    function getPos(pos:number,dim:number){
        return Math.round(pos+(dim/2));
    }

    useFrame((state)=>{
        const { clock,pointer,size,viewport,camera } = state;
        if (!ref.current) return;
        let map = Array(Math.round(viewport.width)).fill(null).map(() => Array(Math.round(viewport.height)).fill(null));
        // fill position
        ref.current.children.forEach(c=>{
            let xPos = getPos(c.position.x,viewport.width)
            let yPos = getPos(c.position.y,viewport.height)
            try {
                map[xPos][yPos] = c.name;
            }catch (e){
                console.log(xPos,"  ",yPos)
            }
        })
        // adding new type
        for (const child of ref.current.children as any) {
            // @ts-ignore
            if (!child || !child.material) continue;
            // @ts-ignore
            let dim = viewport.getCurrentViewport();
            let name = child.name

            let dest = recalculate(dim.height,dim.width,pointer.x,pointer.y);
            const position = child.position;

            let distanceY  = distance(position.y,dest.y,ease(0.05));
            let distanceX = distance(position.x,dest.x,ease(0.05));

            var newX =position.x + distanceX
            var newY =position.y + distanceY - FACTOR_GRAV



            if (map[getPos(newX,viewport.width)][getPos(newY,viewport.height)] == null ||
                map[getPos(newX,viewport.width)][getPos(newY,viewport.height)] == name){
                map[getPos(newX,viewport.width)][getPos(newY,viewport.height)] = name
                map[getPos(position.x,viewport.width)][getPos(position.y,viewport.height)] = null;
                child.position.set(newX,newY);
            }

            let noise = (Math.abs(newX - dest.x) + Math.abs(newY - dest.y)) / 2
            child.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
            child.material.uniforms.u_intensity.value = MathUtils.lerp(
                child.material.uniforms.u_intensity.value,
                (noise/30),
                0.2
            );
        }
    })


    return(
        <group ref={ref}>
            {manager.blobs.map((pos,index)=>(<Particle position={pos} key={index} name={index}/>))}
        </group>
    )
}