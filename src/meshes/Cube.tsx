import {MutableRefObject, useMemo, useRef} from "react";
import {BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap} from "three";
import vertexShader from "../shaders/vertex.glsl?raw"
import fragmentShader from "../shaders/fragment.glsl?raw"
export default function Cube(){


    // little ts hack 'not proud of it'
    const mesh :  MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>> | any = useRef();
    const uniforms = useMemo(
        () => ({
            u_test: {
                value: 1.0,
            },
        }),
        []
    );
    return(
        <mesh ref={mesh}>
            <boxGeometry args={[1,1,1]}/>
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms}/>
        </mesh>
    )

}