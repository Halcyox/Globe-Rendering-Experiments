import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';

const GlobeHeader = ({ globeImage, pointsData, arcData, hexBinPointsData, labelsData }) => {
  const globeEl = useRef(null);

  useEffect(() => {
    const container = globeEl.current;

    const globeInstance = Globe()(container)
      .globeImageUrl(globeImage || '//unpkg.com/three-globe/example/img/earth-day.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showAtmosphere(true)
      .atmosphereColor('#87ceeb')
      .atmosphereAltitude(0.35)
      .hexBinPointsData(hexBinPointsData || [])
      .hexBinPointLat('lat')
      .hexBinPointLng('lng')
      .hexBinPointWeight(1)
      .hexBinResolution(4) // Adjust resolution for finer hexes
      .hexMargin(({ sumWeight }) => Math.min(0.3, sumWeight * 0.05)) // Dynamic margin based on weight
      .hexAltitude(({ sumWeight }) => Math.max(0.05, sumWeight * 0.03)) // Dynamic altitude
      .hexTopColor(({ sumWeight }) => `rgba(0, 255, 0, ${Math.min(1, sumWeight / 10)})`) // Dynamic green shading
      .hexSideColor(({ sumWeight }) => `rgba(0, 100, 0, ${Math.min(0.8, sumWeight / 10)})`) // Darker sides
      .hexBinMerge(false) // Merge disabled for individual hex animation
      .hexTransitionDuration(1500) // Smooth animation for transitions
      .onHexClick(({ points, sumWeight, center }, event, { lat, lng, altitude }) => {
        alert(`Hex Clicked! Points: ${points.length}, Weight: ${sumWeight.toFixed(2)}\nCenter: [${center.lat}, ${center.lng}]`);
      })
      .onHexHover((hex, prevHex) => {
        if (hex) {
          console.log(`Hovered hex weight: ${hex.sumWeight}`);
        } else {
          console.log('Hover left hex');
        }
      })
      .pointsData(pointsData || [])
      .pointAltitude('altitude')
      .pointLat('lat')
      .pointLng('lng')
      .pointColor('color')
      .pointRadius(0.4)
      .pointsMerge(true)
      .arcsData(arcData || [])
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor('color')
      .arcAltitudeAutoScale(0.5)
      .arcStroke(1)
      .arcDashAnimateTime(2000)
      .labelsData(labelsData || [])
      .labelLat('lat')
      .labelLng('lng')
      .labelText('text')
      .labelSize(1.2)
      .labelColor(() => '#ffffff')
      .labelAltitude(0.015)
      .ringsData(pointsData || [])
      .ringLat('lat')
      .ringLng('lng')
      .ringColor(() => '#ffa500')
      .ringMaxRadius(8)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(1000);

    // Enable auto-rotation
    const controls = globeInstance.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    return () => {
      if (container) {
        container.innerHTML = ''; // Cleanup if component unmounts
      }
    };
  }, [globeImage, pointsData, arcData, hexBinPointsData, labelsData]);

  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={globeEl}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      ></div>
    </div>
  );
};

export default GlobeHeader;