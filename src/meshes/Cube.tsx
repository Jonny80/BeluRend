import {MutableRefObject, useMemo, useRef} from "react";
import {BufferGeometry,  FileLoader, Material, Mesh, NormalBufferAttributes, Object3DEventMap} from "three";
import {useLoader} from "@react-three/fiber";
export default function Cube(){

    const fragmentShader = useLoader(FileLoader,'./shaders/fragment.glsl');
    const vertexShader = useLoader(FileLoader,'./shaders/vertex.glsl');

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