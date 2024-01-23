import {useMemo, useRef} from "react";
import vertexShader from "../shaders/vertexBlob.glsl?raw"
import fragmentShader from "../shaders/fragmentBlob.glsl?raw"
import {Vector3} from "three";
let dt = 0.01;
let t = 0;
export function Particle({position,name} : {position:Vector3,name:number}){
    const mesh:any = useRef();
    const uniforms = useMemo(
        () => ({
            u_intensity: {
                value: 0.3,
            },
            u_time: {
                value: 0.0,
            },
        }),
        []
    );

    return (
            <mesh
                ref={mesh}
                position={position}
                scale={.5}
                name={name.toString()}
            >
                <icosahedronGeometry args={[2, 20]} />
                <shaderMaterial
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                    wireframe={false}
                />
            </mesh>
    );


}