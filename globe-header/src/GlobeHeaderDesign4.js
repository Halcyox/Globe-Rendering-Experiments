import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';

const GlobeHeader = () => {
  const globeEl = useRef(null);

  useEffect(() => {
    const globeContainer = globeEl.current;

    const globeInstance = Globe()(globeContainer)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Realistic Earth texture
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png') // Adds terrain details
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png') // Starry night background
      .showAtmosphere(true)
      .atmosphereColor('#87CEEB') // Bright blue atmosphere
      .atmosphereAltitude(0.5);

    // Customize the globe material for realism
    const globeMaterial = globeInstance.globeMaterial();
    globeMaterial.bumpScale = 10; // Emphasize terrain
    new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
      globeMaterial.specularMap = texture; // Add water highlights
      globeMaterial.specular = new THREE.Color('grey');
      globeMaterial.shininess = 15; // Moderate shininess for water
    });

    // Adjust lighting for a realistic effect
    const scene = globeInstance.scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 1, 1); // Positioned to highlight specular map
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040); // Add soft fill light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(-5, -5, 10);
    scene.add(pointLight);

    // Auto-rotation for dynamic interaction
    const controls = globeInstance.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    return () => {
      globeContainer.innerHTML = ''; // Cleanup on unmount
    };
  }, []);

  return (
    <div
      ref={globeEl}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle, #000, #222)', // Subtle gradient for better contrast
      }}
    ></div>
  );
};

export default GlobeHeader;
