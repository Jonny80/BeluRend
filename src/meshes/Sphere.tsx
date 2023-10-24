import {Vector3} from "@react-three/fiber";
import fragmentShader from "../shaders/fragment.glsl?raw"
import vertexShader from "../shaders/waveVertex.glsl?raw"
import {Sphere} from "@react-three/drei";

type SphereProps = {
    position : Vector3,
    scale:number
}
export default function SphereMesh({position,scale}:SphereProps){


    return (
        <mesh>
            <Sphere position={position} scale={scale} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}/>

        </mesh>
    )
}