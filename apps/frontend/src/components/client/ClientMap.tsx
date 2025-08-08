"use client";

import { createClientIcon } from "@/lib/create-client-icon";
import type { Client } from "@/models/client.model";
import type { DivIcon } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type GeocodedClient = Client & { lat: number; lon: number };

type Props = { clients: Client[] };

export default function ClientMap({ clients }: Props) {
  const [geocodedClients, setGeocodedClients] = useState<GeocodedClient[]>([]);
  const [icons, setIcons] = useState<Record<string, DivIcon>>({}); // stocke les icônes par client.id

  useEffect(() => {
    const fetchCoords = async (
      client: Client
    ): Promise<GeocodedClient | null> => {
      const query = encodeURIComponent(client.address);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.length === 0) return null;
        return {
          ...client,
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      } catch {
        console.log("Erreur de géocodage pour :", client.name);
        return null;
      }
    };

    const geocodeAll = async () => {
      const results = await Promise.all(clients.map(fetchCoords));
      const filtered = results.filter((c): c is GeocodedClient => c !== null);
      setGeocodedClients(filtered);
    };

    geocodeAll();
  }, [clients]);

  // Effet pour créer les icônes une fois que geocodedClients est prêt
  useEffect(() => {
    const loadIcons = async () => {
      const newIcons: Record<string, DivIcon> = {};
      for (const client of geocodedClients) {
        newIcons[client.id] = await createClientIcon(client);
      }
      setIcons(newIcons);
    };
    if (geocodedClients.length) {
      loadIcons();
    }
  }, [geocodedClients]);

  const center: [number, number] = [48.8566, 2.3522]; // Paris lat,long

  return (
    <div className="w-full h-[600px] rounded shadow border z-10">
      <MapContainer
        center={center}
        zoom={11}
        className="z-10"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geocodedClients.map((client) =>
          icons[client.id] ? (
            <Marker
              key={client.id}
              position={[client.lat, client.lon]}
              icon={icons[client.id]}
            >
              <Popup>
                <strong>{client.name}</strong>
                <br />
                {client.address}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
