import './App.css'
import {Canvas, Vector3} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Blob from "./meshes/Blob.tsx";




function App() {
    function between(min:number, max:number) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
    function getRandompos(min:number, max:number):Vector3{
        return [between(min,max),between(min,max),between(min,max)]
    }

  return (
      <div>
          <Canvas style={{
              width:'100vw',
              height:'100vh',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'black'
          }} camera={{ position: [15, 15, 15] }}
          >
              <OrbitControls />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
              <Blob position={getRandompos(-10,10)} />
          </Canvas>
      </div>

  )
}

export default App
