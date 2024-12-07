import React from 'react';
import GlobeHeader from './GlobeHeaderDesign5';

const points = [
  { lat: 40.7128, lng: -74.006, altitude: 0.1, color: '#ff0000' },
  { lat: 48.8566, lng: 2.3522, altitude: 0.2, color: '#00ff00' },
  { lat: -33.8688, lng: 151.2093, altitude: 0.15, color: '#0000ff' },
  { lat: 19.076, lng: 72.8777, altitude: 0.18, color: '#ffcc00' },
  { lat: -23.5505, lng: -46.6333, altitude: 0.12, color: '#00cccc' },
  { lat: 55.7558, lng: 37.6173, altitude: 0.16, color: '#ff00ff' },
  { lat: 34.0522, lng: -118.2437, altitude: 0.14, color: '#00ffcc' },
  { lat: 51.5074, lng: -0.1278, altitude: 0.17, color: '#ffff00' },
  { lat: 35.6895, lng: 139.6917, altitude: 0.13, color: '#ff6600' },
];

const arcs = [
  { startLat: 40.7128, startLng: -74.006, endLat: 48.8566, endLng: 2.3522, color: ['#ff0000', '#00ff00'] },
  { startLat: -33.8688, startLng: 151.2093, endLat: 19.076, endLng: 72.8777, color: ['#0000ff', '#ffcc00'] },
  { startLat: 19.076, startLng: 72.8777, endLat: -23.5505, endLng: -46.6333, color: ['#ffcc00', '#00cccc'] },
  { startLat: 55.7558, startLng: 37.6173, endLat: 34.0522, endLng: -118.2437, color: ['#ff00ff', '#00ffcc'] },
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6895, endLng: 139.6917, color: ['#ffff00', '#ff6600'] },
];

const hexBinPoints = [
  ...points.map(({ lat, lng }) => ({ lat, lng })),
  { lat: -1.2921, lng: 36.8219 },
  { lat: 52.52, lng: 13.405 },
  { lat: 37.7749, lng: -122.4194 },
  { lat: -26.2041, lng: 28.0473 },
];

const labels = points.map(({ lat, lng }, idx) => ({
  lat,
  lng,
  text: ['New York', 'Paris', 'Sydney', 'Mumbai', 'São Paulo', 'Moscow', 'Los Angeles', 'London', 'Tokyo'][idx],
}));

function App() {
  return (
    <div>
      <header>
        <GlobeHeader
          pointsData={points}
          arcData={arcs}
          hexBinPointsData={hexBinPoints}
          labelsData={labels}
        />
      </header>
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Enhanced Globe.gl Visualization</h1>
        <p>
          Explore the interactive 3D globe featuring points, arcs, hex bins, labels, and ripple rings!
        </p>
      </main>
    </div>
  );
}

export default App;
