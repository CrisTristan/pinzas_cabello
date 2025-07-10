// src/components/MapSelector.tsx
'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapClickHandler = ({ setPosition, setAddress }: any) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`
      );
      const data = await res.json();
      setAddress(data.display_name || 'Dirección no encontrada');
    },
  });
  return null;
};

export default function MapSelector() {
  const [position, setPosition] = useState<[number, number]>([21.1619, -86.8515]); // Cancún
  const [address, setAddress] = useState('');
  const [inputAddress, setInputAddress] = useState('');

  // 👉 Buscar coordenadas por dirección escrita
  const handleAddressSearch = async () => {
    if (!inputAddress.trim()) return;

    const query = encodeURIComponent(inputAddress);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&limit=1`
    );
    const data = await res.json();

    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
      setAddress(display_name);
    } else {
      setAddress('No se encontró la dirección.');
    }
  };

  return (
    <div>
      <label htmlFor="addressInput"><strong>Buscar por dirección:</strong></label>
      <input
        id="addressInput"
        type="text"
        placeholder="Ej. Avenida Tulum, Cancún"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
        onBlur={handleAddressSearch}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <MapContainer
        center={position}
        zoom={14}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={customIcon} />
        <MapClickHandler setPosition={setPosition} setAddress={setAddress} />
      </MapContainer>

      <div style={{ marginTop: '1rem' }}>
        <strong>Dirección:</strong>
        <p>{address}</p>
      </div>
    </div>
  );
}

