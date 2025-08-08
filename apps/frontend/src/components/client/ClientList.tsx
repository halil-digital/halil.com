"use client";

import { Client } from "@/models/client.model";
import { getAllClients } from "@/services/client.service";
import { List, Map } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ClientTable from "./ClientTable";
import CreateClientDialog from "./CreateClientDialog";

const ClientMap = dynamic(() => import("./ClientMap"), { ssr: false });

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "map">("table");

  const fetchClients = () => {
    setLoading(true);
    getAllClients()
      .then(setClients)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Liste des clients</h2>
      <div className="flex justify-between items-center">
        <CreateClientDialog onClientCreated={fetchClients} />
        <div className="inline-flex items-center border rounded overflow-hidden">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-medium transition ${
              viewMode === "table"
                ? "bg-[#ebc834] text-white"
                : "bg-white text-gray-700 hover:bg-[#dfca70]"
            }`}
          >
            <List />
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 text-sm font-medium transition ${
              viewMode === "map"
                ? "bg-[#ebc834] text-white"
                : "bg-white text-gray-700 hover:bg-[#dfca70]"
            }`}
          >
            <Map />
          </button>
        </div>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : viewMode === "table" ? (
        <ClientTable />
      ) : (
        <ClientMap clients={clients} />
      )}
    </div>
  );
}
