import {Canvas, useFrame, useThree,} from "@react-three/fiber";
import {OrbitControls, Sphere} from "@react-three/drei";
import Blob from "./Blob.tsx";
import Manager from "../manager/manager.ts";
import {useRef} from "react";
const manager= new Manager(0,50,400)

export default function Scene(){

    const MyMesh = () => {
        const { viewport } = useThree()
        // viewport = canvas in 3d units (meters)

        const ref = useRef()
        useFrame(({ mouse }) => {
            const x = (mouse.x * viewport.width) / 2
            const y = (mouse.y * viewport.height) / 2
            // @ts-ignore
            ref.current.position.set(x, y, 0)
            // @ts-ignore
            ref.current.rotation.set(-y, x, 0)
        })

        return (<Sphere ref={ref as any} scale={5} position={[50,50,0]}/>
        );
    }

    return(
        <Canvas style={{
            width:'100vw',
            height:'100vh',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'black'
        }} camera={{ position: [80, 80, 100] }}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
            <MyMesh />
            <OrbitControls />
            {manager.blobs.map((pos,index)=><Blob position={pos} key={index}/>)}
        </Canvas>
    )
}