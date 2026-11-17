
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
import { useState } from "react";
import axios from "axios";

// displays map, location of sold houses and basic business values

const MAP = 'map';

const districts = [
  { name: "三峽區", coordinates: [121.40, 24.88] },
  { name: "三芝區", coordinates: [121.53, 25.24] },
  { name: "三重區", coordinates: [121.49, 25.06] },
  { name: "中和區", coordinates: [121.50, 25.00] },
  { name: "五股區", coordinates: [121.44, 25.08] },
  { name: "八里區", coordinates: [121.40, 25.15] },
  { name: "土城區", coordinates: [121.43, 24.97] },
  { name: "坪林區", coordinates: [121.73, 24.92] },
  { name: "平溪區", coordinates: [121.74, 25.03] },
  { name: "新店區", coordinates: [121.53, 24.95] },
  { name: "新莊區", coordinates: [121.45, 25.03] },
  { name: "板橋區", coordinates: [121.47, 25.01] },
  { name: "林口區", coordinates: [121.35, 25.10] },
  { name: "樹林區", coordinates: [121.40, 24.98] },
  { name: "永和區", coordinates: [121.52, 25.01] },
  { name: "汐止區", coordinates: [121.67, 25.07] },
  { name: "泰山區", coordinates: [121.42, 25.05] },
  { name: "淡水區", coordinates: [121.43, 25.17] },
  { name: "深坑區", coordinates: [121.62, 25.00] },
  { name: "烏來區", coordinates: [121.55, 24.87] },
  { name: "瑞芳區", coordinates: [121.80, 25.12] },
  { name: "石碇區", coordinates: [121.63, 24.95] },
  { name: "石門區", coordinates: [121.57, 25.27] },
  { name: "萬里區", coordinates: [121.63, 25.18] },
  { name: "蘆洲區", coordinates: [121.47, 25.08] },
  { name: "貢寮區", coordinates: [121.90, 25.02] },
  { name: "金山區", coordinates: [121.60, 25.22] },
  { name: "雙溪區", coordinates: [121.83, 25.01] },
  { name: "鶯歌區", coordinates: [121.33, 24.95] }
];

const features = districts.map((district) =>
  new Feature({
    geometry: new Point(fromLonLat(district.coordinates)),
    name: district.name,
  })
);

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
  const [location, setLocation] = useState([]);

  const getLocationDetails = async (locationId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/locations/${locationId}`
      );

      setLocation(response.data);

    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

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

    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const locationName = feature.get('name');

        console.log('Clicked location:', locationName);

        getLocationDetails(locationName);
      }
    });

    map.on('pointermove', (event) => {
      const hit = map.hasFeatureAtPixel(event.pixel);

      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);



  return (
    <div className="dashboard">

      <section className="map-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow textual">INTERACTIVE MAP</span>
            <h2>Explore Districts</h2>
            <p className='textual'>Select a district to view its housing statistics.</p>
          </div>
        </div>

        <div className="mapContainer">
          <div id={MAP}></div>

          <div className="attribution">
            © <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a> contributors
          </div>
        </div>
      </section>

      <section className="statistics-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DISTRICT OVERVIEW</span>
            <h2>Housing Statistics</h2>
          </div>
        </div>

        {location && location.length > 0 && (() => {
          const areas = location
            .map(item => Number(item.rps03_area))
            .filter(value => Number.isFinite(value) && value > 0)
            .sort((a, b) => a - b);

          const prices = location
            .map(item => Number(item.rps21_amountsunitdollars))
            .filter(value => Number.isFinite(value) && value > 0)
            .sort((a, b) => a - b);

          const getMedian = (arr) => {
            if (arr.length === 0) return 0;
            const mid = Math.floor(arr.length / 2);
            return arr.length % 2 === 0
              ? (arr[mid - 1] + arr[mid]) / 2
              : arr[mid];
          };

          const medianArea = getMedian(areas);
          const medianPrice = getMedian(prices);
          const pricePerSqm = medianArea > 0
            ? medianPrice / medianArea
            : 0;

          return (
            <div className="statistics-grid">

              <div className="stat-card">
                <span className="stat-label textual">Median House Area</span>
                <div className="stat-value textual">
                  {medianArea.toLocaleString()}
                  <span className="stat-unit">m²</span>
                </div>
              </div>

              <div className="stat-card">
                <span className="stat-label textual">Median House Price</span>
                <div className="stat-value textual">
                  ${medianPrice.toLocaleString()}
                </div>
              </div>

              <div className="stat-card">
                <span className="stat-label textual">Price per m²</span>
                <div className="stat-value textual">
                  ${pricePerSqm.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>

            </div>
          );
        })()}

      </section>

    </div>
  );


};

export default MapElement;
