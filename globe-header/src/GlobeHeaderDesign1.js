import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { feature } from 'topojson-client'; // Correct module import

const GlobeHeader = () => {
  const globeEl = useRef(null);

  useEffect(() => {
    const globeContainer = globeEl.current;

    const globeInstance = Globe()(globeContainer)
      .backgroundColor('rgba(0,0,0,0)')
      .showGlobe(false)
      .showAtmosphere(false)
      .polygonsData([])
      .onPolygonHover(null) // Disable default polygon hover behavior
      .polygonsTransitionDuration(0); // Instant rendering of polygons

    // Fetch and render land polygons with custom shaders
    fetch('//unpkg.com/world-atlas/land-110m.json')
      .then(res => res.json())
      .then(landTopo => {
        const landPolygons = feature(landTopo, landTopo.objects.land).features;

        // Custom shader material for a glowing effect
        const glowingMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 1.0 },
            glowColor: { value: new THREE.Color(0x00ffff) },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, intensity);
            }
          `,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
        });

        globeInstance
          .polygonsData(landPolygons)
          .polygonCapMaterial(glowingMaterial) // Apply glowing material
          .polygonSideColor(() => 'rgba(0,0,0,0)') // Invisible sides
          .polygonAltitude(0.02); // Add depth to polygons
      });

    // Add bright lights
    const scene = globeInstance.scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x808080); // Soft fill light
    scene.add(ambientLight);

    // Auto-rotation
    const controls = globeInstance.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

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
        background: 'radial-gradient(circle, #000, #333)', // Darker background for brightness contrast
      }}
    ></div>
  );
};

export default GlobeHeader;