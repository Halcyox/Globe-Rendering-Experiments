import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { feature } from 'topojson-client';

const GlobeHeader = () => {
  const globeEl = useRef(null);

  useEffect(() => {
    const globeContainer = globeEl.current;

    const globeInstance = Globe()(globeContainer)
      .backgroundColor('rgba(240,248,255,1)') // Light blue sky-like background
      .showGlobe(false)
      .showAtmosphere(true)
      .atmosphereColor('#87CEEB') // Bright sky blue
      .atmosphereAltitude(0.5)
      .polygonsData([])
      .onPolygonHover(null)
      .polygonsTransitionDuration(0);

    // Fetch and render land polygons with custom shaders
    fetch('//unpkg.com/world-atlas/land-110m.json')
      .then(res => res.json())
      .then(landTopo => {
        const landPolygons = feature(landTopo, landTopo.objects.land).features;

        // Custom shader for dynamic cheerful colors
        const dynamicMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 1.0 },
            colorA: { value: new THREE.Color('#32CD32') }, // Vibrant green
            colorB: { value: new THREE.Color('#00BFFF') }, // Bright blue
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 colorA;
            uniform vec3 colorB;
            varying vec2 vUv;
            void main() {
              vec3 color = mix(colorA, colorB, vUv.y);
              gl_FragColor = vec4(color, 1.0);
            }
          `,
          side: THREE.DoubleSide,
        });

        globeInstance
          .polygonsData(landPolygons)
          .polygonCapMaterial(dynamicMaterial) // Apply gradient material
          .polygonSideColor(() => 'rgba(255,255,255,0.5)') // Soft white sides for depth
          .polygonAltitude(0.05); // Add depth to polygons
      });

    // Add lights for a brighter, dynamic feel
    const scene = globeInstance.scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xb0e0e6); // Soft pastel blue
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(-10, -10, 20);
    scene.add(pointLight);

    // Auto-rotation for dynamic effect
    const controls = globeInstance.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

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
        background: 'radial-gradient(circle, #e6f7ff, #dff6f0)', // Soft blue-green gradient
      }}
    ></div>
  );
};

export default GlobeHeader;
