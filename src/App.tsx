import './App.css'
import {Canvas, Vector3} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Blob from "./meshes/Blob.tsx";
import {Slider} from "@mui/material";
import {useState} from "react";




function App() {

    const [amount,setAmount] = useState(100);
    function between(min:number, max:number) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
    // @ts-ignore
    function getRandompos(min:number, max:number):Vector3{
        return [between(min,max),between(min,max),between(min,max)]
    }
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setAmount(newValue as number);
    };
  return (
      <div style={{
        width:'100vw',
            height:'100vh',
            }}>

          <Canvas style={{
              width:'100vw',
              height:'80vh',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'black'
          }} camera={{ position: [15, 15, 15] }}
          >
              <OrbitControls />

              {(() => {
                  const arr = [];
                  for (let i = 0; i < amount; i++) {
                      let randomPos = getRandompos(-40,40);
                      arr.push(
                              <Blob position={randomPos}/>
                      );
                  }
                  return arr;
              })()}
          </Canvas>
          <Slider
              style={{position:'absolute',bottom:'10%',right:'10%',width:"80%"}}
              defaultValue={100}
              step={100}
              value={typeof amount === 'number' ? amount : 100}
              onChange={handleSliderChange}
              marks min={100} max={500}
          />
      </div>

  )
}

export default App
