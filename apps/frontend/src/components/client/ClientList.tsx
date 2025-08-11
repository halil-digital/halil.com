"use client";

import { Client } from "@/models/client.model";
import { getAllClients } from "@/services/client.service";
import { ArrowUpAz, Map, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClientTable from "./ClientTable";
import CreateClientDialog from "./CreateClientDialog";

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

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
      {/* Sous-barre d’actions */}
      <div className="w-full border-b border-gray-400 flex justify-center gap-2 m-0">
        <button
          onClick={() => setSearchActive(!searchActive)} // toggle activation
          className={`flex flex-col items-center px-4 py-2 text-sm font-medium transition cursor-pointer hover:text-[#dfca70] ${
            searchActive ? "text-[#dfca70]" : ""
          }`}
        >
          <Search />
          <span>Rechercher</span>
        </button>
        <button className="flex flex-col items-center px-4 py-2 text-sm hover:text-[#dfca70] font-medium transition cursor-pointer">
          <ArrowUpAz />
          <span>ABC</span>
        </button>
        {/* Passe fetchClients au dialogue de création */}
        <CreateClientDialog onClientCreated={fetchClients} />
      </div>

      {/* Barre de recherche visible uniquement si searchActive */}
      {searchActive && (
        <div className="bg-gray-200 border-b border-gray-300 m-0 p-2">
          <div className="flex">
            <div className="relative bg-white">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 h-10 pl-3 pr-3 border border-gray-400 border-r-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#006680] focus:border-[#006680]"
              />
            </div>
            <button
              className="h-10 px-3 bg-[#006680] text-white hover:bg-[#008099] transition-colors border border-[#006680]"
              title="Rechercher"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center m-0 p-2">
        <div>
          <span>Tous les {clients.length} clients</span>
        </div>
        <Link
          href="/dashboard/clients/map"
          className=" flex flex-col items-center px-4 py-2 text-sm font-medium hover:text-[#dfca70] transition"
        >
          <Map />
          Carte
        </Link>
      </div>

      {/* Passe clients et fetchClients à ClientTable */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ClientTable onClientUpdated={fetchClients} />
      )}
    </div>
  );
}
