// src/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MapSelector = dynamic(() => import('./MapSelector'), { ssr: false, loading: () => <p>Cargando mapa...</p> });

export default function MapWrapper() {
  return (
    <Suspense fallback={<div>Cargando mapa...</div>}>
      <MapSelector />
    </Suspense>
  );
}
