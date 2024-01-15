import './App.css'
import {Canvas, Vector3} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import MovingWave from "./meshes/MovingWave.tsx";




function App() {
    function between(min:number, max:number) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
    // @ts-ignore
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
              <MovingWave />
          </Canvas>
      </div>

  )
}

export default App
