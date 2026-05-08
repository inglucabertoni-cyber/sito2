"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CITY_COORDS: Record<string, [number, number]> = {
  Milano: [45.4654, 9.1859],
  Torino: [45.0703, 7.6869],
  Genova: [44.4056, 8.9463],
  Firenze: [43.7696, 11.2558],
  Bologna: [44.4949, 11.3426],
  Roma: [41.9028, 12.4964],
  Napoli: [40.8518, 14.2681],
  Venezia: [45.4408, 12.3155],
};

export type AppuntamentoPin = {
  id: string;
  clientName: string;
  serviceType: string;
  city: string;
  address?: string | null;
  confirmedDate?: string | null;
  status: string;
};

const SERVICE_LABEL: Record<string, string> = {
  ANALISI_IMMOBILE: "Analisi immobile",
  DUE_DILIGENCE: "Due diligence",
  PROGETTAZIONE: "Progettazione",
  APPALTO: "Gare d'appalto",
  GENERALE: "Consulenza generale",
};

type GeocodedPin = AppuntamentoPin & { lat: number; lng: number };

async function geocode(address: string, city: string): Promise<[number, number] | null> {
  const query = address ? `${address}` : city;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { "Accept-Language": "it" } }
    );
    const data = await res.json();
    if (data[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return CITY_COORDS[city] ?? null;
}

export default function MappaAppuntamenti({ appuntamenti }: { appuntamenti: AppuntamentoPin[] }) {
  const [pins, setPins] = useState<GeocodedPin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadPins() {
      const result: GeocodedPin[] = [];
      for (const a of appuntamenti) {
        const coords = await geocode(a.address ?? "", a.city);
        if (coords) result.push({ ...a, lat: coords[0], lng: coords[1] });
        await new Promise((r) => setTimeout(r, 300)); // rispetta rate limit Nominatim
      }
      if (!cancelled) {
        setPins(result);
        setLoading(false);
      }
    }
    loadPins();
    return () => { cancelled = true; };
  }, [appuntamenti]);

  const center: [number, number] = pins.length > 0
    ? [pins.reduce((s, p) => s + p.lat, 0) / pins.length, pins.reduce((s, p) => s + p.lng, 0) / pins.length]
    : [43.5, 12.0];

  if (loading && appuntamenti.length > 0) {
    return (
      <div className="w-full h-72 bg-gray-100 rounded-2xl flex items-center justify-center text-sm text-gray-400">
        Caricamento mappa... ({appuntamenti.length} appuntamenti)
      </div>
    );
  }

  if (pins.length === 0) return null;

  return (
    <MapContainer center={center} zoom={6} className="w-full h-72 rounded-2xl z-0" scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.clientName}</strong><br />
            {SERVICE_LABEL[p.serviceType] ?? p.serviceType}<br />
            {p.address && <>{p.address}<br /></>}
            📍 {p.city}<br />
            {p.confirmedDate && <>📅 {new Date(p.confirmedDate).toLocaleDateString("it-IT")}<br /></>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
