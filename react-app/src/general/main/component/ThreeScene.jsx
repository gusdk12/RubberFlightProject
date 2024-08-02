import * as THREE from "three"
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'

import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei"

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function Airplane() {
    const { scene } = useGLTF('/models/a320neo/scene.gltf');
    const ref = useRef();
    const startTime = useRef(null); // To track the start time for easing
    const initialPosition = 30; // Initial position off-screen
    let time = 0;

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
      {/* <Canvas className="canvas" 
        camera={{ position: [25, 10, -25], fov: 45, near: 0.1, far: 1000 }} style={{ width: '100%', height: '700px' }}>
          <EffectComposer>
              <DepthOfField focusDistance={0} focalLength={0.07} bokehScale={1.5} height={480} />
          </EffectComposer>
          <Sky />
          <directionalLight position={[0, 1, -1]} intensity={3.7} />
          <Airplane />
       </Canvas> */}
      <div className="canvasgradienttop"></div>
      <div className="canvasgradient"></div>
    </>
  );
}

function Sky() {
    const ref = useRef();
    const numClouds = 3; // Number of clouds
    const cloudSpeed = 0.1; // Speed of cloud movement
    const cloudsRef = useRef([]);
  
    useFrame(() => {
      cloudsRef.current.forEach((cloud, index) => {
        if (cloud) {
          cloud.position.x += cloudSpeed;
          if (cloud.position.x > 200) {
            cloud.position.x = -400;
          }
        }
      });
    });
    
    const cloudPositions = Array.from({ length: numClouds }, (_, index) => [
        0 + (index * -200),
        -60,
        80
    ]);

    return (
      <>
        {/* <SkyImpl sunPosition={[10, 10, 0]}/> */}
        <group ref={ref}>
            <Clouds material={THREE.MeshLambertMaterial} limit={400}>
                {cloudPositions.map((position, index) => (
                    <Cloud
                        key={index}
                        ref={(el) => (cloudsRef.current[index] = el)}
                        concentrate="outside"
                        growth={100}
                        color="#f7fdff"
                        opacity={0.9}
                        seed={Math.random()}
                        bounds={[200, 0, 200]}
                        volume={100}
                        // position={[0, -35, 0]}
                        position={position}
                    />
                ))}
            </Clouds>
        </group>
      </>
    )
  }

export default ThreeScene;


