import Manager from "../manager/manager.ts";
import {Particle} from "./Particle.tsx";
import {MutableRefObject, useRef} from "react";
import {Group, MathUtils, Object3D, Object3DEventMap, Vector2, Vector3} from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {distance, ease, lerp, recalculate} from "../Utils/utils.ts";

const manager= new Manager(-50,50,4)
let dt = 0.01;
let t = 0;
const FACTOR_GRAV = 0.4;
const FACTOR_PULL = 0.4;
export default function Simulation(){

    const ref = useRef<Group>(null)

    const {viewport} = useThree();

    useFrame((state)=>{
        const { clock,pointer,size,viewport,camera } = state;
        if (!ref.current) return;
        // adding new type
        for (const child of ref.current.children as any) {
            // @ts-ignore
            if (!child || !child.material) continue;
            // @ts-ignore
            let dim = viewport.getCurrentViewport();
            // adding some sort of acceleration
            // adding some sort of collision detection
            let dest = recalculate(dim.height,dim.width,pointer.x,pointer.y);
            const position = child.position;
            let distanceY  = distance(position.y,dest.y,ease(0.05))
            var newX = lerp(position.x, dest.x, ease(0.05))
            var newY = position.y + distanceY - FACTOR_GRAV
            newY =Math.max(newY,(dim.height/2)*-1)
            console.log(newY)
            let noise = (Math.abs(newX - dest.x) + Math.abs(newY - dest.y)) / 2
            child.position.set(newX,newY, 0);  // set new position

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