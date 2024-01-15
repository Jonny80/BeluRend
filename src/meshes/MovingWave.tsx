import React, {useMemo, useRef} from "react";
import {  useFrame } from "@react-three/fiber";
import fragmentShader from "../shaders/fragment.glsl?raw"
import vertexShader from "../shaders/waveVertex.glsl?raw"


export default function MovingWave(){
    const mesh: React.MutableRefObject<any> = useRef();

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
        }), []
    );

    useFrame((state) => {
        const { clock } = state;
        // @ts-ignore
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();

    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe
            />
        </mesh>
    );
}