import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Circle, Sphere} from "@react-three/drei";
import {Group, Vector3} from "three";
import {recalculate} from "../Utils/utils.ts";

export const Moon = () =>{
    const ref = useRef<any>(null)

    useFrame(({pointer,viewport})=>{
        let dim = viewport.getCurrentViewport();
        let dest = recalculate(dim.height,dim.width,pointer.x,pointer.y);
        if (ref.current) ref.current.position.set(dest.x,dest.y,0)
    })

    return(
        <mesh ref={ref} position={new Vector3(0,0,0)}>
            <Circle args={[5,32,32]} />
            <meshBasicMaterial color="rgb(0, 0, 0)" />
        </mesh>
    )
}