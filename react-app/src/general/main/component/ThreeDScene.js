import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import '../CSS/MainPage.css';

const ThreeDScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 40;
    camera.position.y = 3;
    

    // let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // mountRef.current.appendChild(renderer.domElement);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.physicallyCorrectLights = true;
    mountRef.current.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xFFFFFF);

    const loader = new GLTFLoader();

    // Lighting
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
    scene.add(ambientLight);

    // Directional light for sunlight effect
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10); // positioned to the right and above the model
    directionalLight.castShadow = true; // enable shadow casting
    scene.add(directionalLight);

    // Point light for additional highlights
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-10, 10, 10); // positioned to provide additional shading and highlights
    scene.add(pointLight);

    // Spot light for dramatic effects
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 20, 10);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight);

    let airplaneModel, skyModel, mixer;
    const clock = new THREE.Clock();
    loader.load('/models/boeing_787-9_qantas_centenary/scene.gltf', (gltf) => {
        airplaneModel = gltf.scene;
        scene.add(gltf.scene);
        airplaneModel.rotation.y = 4.1;
    //     model.rotation.x = 0;
        airplaneModel.position.y = -10;
        
        if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(airplaneModel);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }
        renderer.render(scene, camera);
    });
    loader.load('/models/unreal_engine_4_sky/scene.gltf', (gltf) => {
        skyModel = gltf.scene;
        scene.add(gltf.scene);
        skyModel.scale(10, 10, 10);
        renderer.render(scene, camera);
    });

    // Post-processing setup
    const composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    const glitchPass = new GlitchPass();
    composer.addPass( glitchPass );

    const outputPass = new OutputPass();
    composer.addPass( outputPass );
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        if (mixer) {
            const delta = clock.getDelta();
            mixer.update(delta);
        }

        renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ThreeDScene;
