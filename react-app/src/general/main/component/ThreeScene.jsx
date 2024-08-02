import * as THREE from "three"
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing'

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function Airplane() {
    const { scene } = useGLTF('/models/a319_plane/scene.gltf');
    const ref = useRef();
    const startTime = useRef(null); // To track the start time for easing
    const initialPosition = 30; // Initial position off-screen
    let time = 0;

    useFrame(() => {
      if (ref.current) {
          ref.current.traverse((child) => {
              if (child.isMesh && child.material) {
                  const material = child.material;
                  if (material instanceof THREE.MeshStandardMaterial) {
                      material.emissive.set('#aaaaaa'); 
                      material.emissiveIntensity = 0.15; 
                  }
              }
          });
      }
  });

    useFrame((state, delta) => {
      // if (!startTime.current) startTime.current = state.clock.getElapsedTime(); // Set start time
  
      // const elapsedTime = state.clock.getElapsedTime() - startTime.current;
      // const duration = 2.5; // Duration in seconds to move from left to center
  
      // // Use easeInOutQuad to ease the animation
      // const progress = Math.min(elapsedTime / duration, 1); // Clamp progress between 0 and 1
      // const easedProgress = easeInOutQuad(progress);
  
      // // Move the airplane from left to center
      // ref.current.position.x = initialPosition - easedProgress * 30; // Move from -30 to 0
  
      // Optionally, make the airplane oscillate or rotate
      // ref.current.rotation.x = Math.sin(elapsedTime * 0.4) * 0.1;
      // ref.current.rotation.z = Math.cos(elapsedTime * 0.4) * 0.1;
      
      const oscillation = Math.sin(time * 0.8) * 0.5;
      const sideMovement = Math.cos(time * 0.8) * 0.5;

      time += delta;

      ref.current.position.y = oscillation;
      // ref.current.position.x = sideMovement;
      ref.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      ref.current.rotation.y = (Math.PI / -2) + Math.cos(time * 0.2) * 0.05;
      ref.current.rotation.z = Math.cos(time * 0.3) * 0.1;
      if(ref.current.position.x <= 0)
        ref.current.position.x = sideMovement;  
  
      // Stop the animation when it reaches the center
      // if (easedProgress >= 1) startTime.current = null; // Stop updating if done
    });
  
    return <primitive ref={ref} object={scene} scale={0.5} rotation={[0, 4.7, 0]} position={[0, 0, 0]} />;
  
}
function ThreeScene() {
  return ( 
    <>
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true }}
        camera={{ position: [-220, 10, -250], fov: 45, near: 0.1, far: 1000 }} 
        style={{ width: '100vw', height: '100vh', 
          background: 'linear-gradient(to bottom, #B0C9E6, #D5E1EB, #EFF3F6)',
        }}>

          <ambientLight intensity={0.9} color="#AEDEFF"/>
          <pointLight position={[0, 0, 0]} intensity={0.5}/>

          <EffectComposer/>

          <Airplane />
          <Environment preset="city" blur={0.8} />
       </Canvas>
    </>
  );
}

export default ThreeScene;


