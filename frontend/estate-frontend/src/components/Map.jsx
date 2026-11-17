
import React, { useEffect } from 'react';
import { Map, View, Feature } from 'ol';
import { Zoom } from 'ol/control';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj.js';
import { Style, Icon } from 'ol/style.js';
import reactSvg from '../assets/pin.svg?url';

const MAP = 'map';

const locations = [
  {
    name: 'Taipei 101',
    coordinates: [121.5654, 25.0330],
  },
  {
    name: 'Taipei Main Station',
    coordinates: [121.5170, 25.0478],
  },
  {
    name: 'Shilin Night Market',
    coordinates: [121.5249, 25.0878],
  },
  {
    name: 'National Palace Museum',
    coordinates: [121.5495, 25.1024],
  },
];

// Create a Feature for every location
const features = locations.map((location) =>
  new Feature({
    geometry: new Point(fromLonLat(location.coordinates)),
    name: location.name,
  })
);

// Vector layer containing all location pins
const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: features,
  }),
  style: new Style({
    image: new Icon({
      src: reactSvg,
      anchor: [0.5, 1],
    }),
  }),
});

const OSMLayer = new TileLayer({
  source: new OSM(),
});

const MapElement = () => {
  useEffect(() => {
    const map = new Map({
      target: MAP,
      view: new View({
        center: fromLonLat([121.5654, 25.0330]),
        zoom: 12,
      }),
      layers: [OSMLayer, vectorLayer],
      controls: [new Zoom()],
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="mapContainer">
      <div id={MAP}></div>
      <div className="attribution">
        © <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap
        </a> contributors
      </div>
    </div>
  );
};

export default MapElement;
