import './App.css'
import {Canvas} from "@react-three/fiber";
import Cube from "./meshes/Cube.tsx";
import {OrbitControls} from "@react-three/drei";




function App() {


  return (
      <div>
          <Canvas style={{
              width:'100vw',
              height:'100vh',
              alignItems:'center',
              justifyContent:'center'
          }}>
              <OrbitControls />
              <axesHelper />
              <Cube />
          </Canvas>
      </div>

  )
}

export default App
