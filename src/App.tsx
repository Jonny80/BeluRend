import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Blob from "./meshes/Blob.tsx";




function App() {


  return (
      <div>
          <Canvas style={{
              width:'100vw',
              height:'100vh',
              alignItems:'center',
              justifyContent:'center'
          }} camera={{ position: [1.0, 1.5, 1.0] }}
          >
              <OrbitControls />
              <axesHelper />
              <Blob />
          </Canvas>
      </div>

  )
}

export default App
