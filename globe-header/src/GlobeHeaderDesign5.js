import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3';
import indexBy from 'index-array-by';

const GlobeHeader = () => {
  const globeEl = useRef(null);

  useEffect(() => {
    const COUNTRY = 'United States';
    const OPACITY = 0.22;

    const globeInstance = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 }) // Aim at the US centroid
      .arcLabel(d => `${d.airline}: ${d.srcIata} → ${d.dstIata}`)
      .arcStartLat(d => +d.srcAirport.lat)
      .arcStartLng(d => +d.srcAirport.lng)
      .arcEndLat(d => +d.dstAirport.lat)
      .arcEndLng(d => +d.dstAirport.lng)
      .arcDashLength(0.25)
      .arcDashGap(1)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(4000)
      .arcColor(d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`])
      .arcsTransitionDuration(0)
      .pointColor(() => 'orange')
      .pointAltitude(0)
      .pointRadius(0.02)
      .pointsMerge(true);

    // Load data
    const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({
      airportId,
      name,
      city,
      country,
      iata,
      icao,
      lat,
      lng,
      alt,
      timezone,
      dst,
      tz,
      type,
      source,
    });

    const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({
      airline,
      airlineId,
      srcIata,
      srcAirportId,
      dstIata,
      dstAirportId,
      codeshare,
      stops,
      equipment,
    });

    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
        .then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse)),
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat')
        .then(res => res.text())
        .then(d => d3.csvParseRows(d, routeParse)),
    ]).then(([airports, routes]) => {
      const byIata = indexBy(airports, 'iata', false);

      const filteredRoutes = routes
        .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // Exclude unknown airports
        .filter(d => d.stops === '0') // Non-stop flights only
        .map(d => ({
          ...d,
          srcAirport: byIata[d.srcIata],
          dstAirport: byIata[d.dstIata],
        }))
        .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // International routes from country

      globeInstance.pointsData(airports).arcsData(filteredRoutes);
    });

    return () => {
      if (globeEl.current) {
        globeEl.current.innerHTML = ''; // Cleanup safely
      }
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
