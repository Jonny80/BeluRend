import {MathUtils} from "three";
import {useFrame, Vector3} from "@react-three/fiber";
import { useMemo, useRef} from "react";
import vertexShader from "../shaders/vertexBlob.glsl?raw"
import fragmentShader from "../shaders/fragmentBlob.glsl?raw"

type blobProps ={
    position:Vector3,
}
export default function Blob({position}:blobProps = {position:[0,0,0]}){
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

    // @ts-ignore
    function moveTo(startPosition:Vector3,target:Vector3) : Vector3 {
        let scale = 0.05;
        // @ts-ignore
        let direcVec = [(target[0] - startPosition[0])*scale,(target[1] - startPosition[1])*scale,(target[2] - startPosition[2])*scale] as Vector3
        // @ts-ignore
        return  [(direcVec[0] + startPosition[0]),(direcVec[1] + startPosition[1]),(direcVec[2] + startPosition[2])] as Vector3
    }

    // @ts-ignore
    useFrame((state) => {
        const { clock } = state;
        //const x = (mouse.x * viewport.width) / 2
        //const y = (mouse.y * viewport.height) / 2

        // @ts-ignore
        //mesh.current.position.set(x*distance, y*distance,0)
        // @ts-ignore
        mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
            mesh.current.material.uniforms.u_intensity.value,
            0.85,
            0.02
        );

    });

    return (
        <mesh
            ref={mesh}
            position={position}
            scale={.5}
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