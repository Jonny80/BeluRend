import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Blob from "./Blob.tsx";
import Manager from "../manager/manager.ts";
import {Moon} from "./Moon.tsx";
import {Particle} from "./Particle.tsx";
import {useRef} from "react";
import {Group} from "three";
import Simulation from "./Simulation.tsx";
const manager= new Manager(-50,50,5)

export default function Scene(){


    return(
        <Canvas style={{
            width:'100vw',
            height:'100vh',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'white'
        }} camera={{ position: [0, 0, 100]}}>
            <OrbitControls enableRotate={false}/>
            <Moon />
           <Simulation />
        </Canvas>
    )
}