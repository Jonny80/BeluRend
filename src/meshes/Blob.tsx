import {MathUtils} from "three";
import {useFrame} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import vertexShader from "../shaders/vertexBlob.glsl?raw"
import fragmentShader from "../shaders/fragmentBlob.glsl?raw"

export default function Blob(){
    // This reference will give us direct access to the mesh
    const mesh:any = useRef();
    const hover:any = useRef(false);

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

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
            mesh.current.material.uniforms.u_intensity.value,
            hover.current ? 0.85 : 0.15,
            0.02
        );
    });

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            scale={1.5}
            onPointerOver={() => (hover.current = true)}
            onPointerOut={() => (hover.current = false)}
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