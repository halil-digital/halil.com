"use client";

import { Client } from "@/models/client.model";
import { getAllClients, searchClients } from "@/services/client.service";
import { ArrowUpAz, Map, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ClientTable from "./ClientTable";
import CreateClientDialog from "./CreateClientDialog";

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [isSorted, setIsSorted] = useState(false); // État pour tri ABC

  // Ref pour debounce
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchClients = (query = "") => {
    setLoading(true);

    const fetchFn = query.trim() ? searchClients : getAllClients;

    fetchFn(query)
      .then(setClients)
      .finally(() => setLoading(false));
  };

  // Au montage, charge tous les clients
  useEffect(() => {
    fetchClients();
  }, []);

  // Dès que la recherche change, debounce et lance la recherche
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchClients(search);
    }, 500); // 500 ms de délai

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search]);

  // Trie les clients par nom si isSorted est vrai
  const displayedClients = isSorted
    ? [...clients].sort((a, b) => a.name.localeCompare(b.name))
    : clients;

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
        <button
          onClick={() => setIsSorted(!isSorted)} // toggle tri ABC
          className={`flex flex-col items-center px-4 py-2 text-sm hover:text-[#dfca70] font-medium transition cursor-pointer ${
            isSorted ? "text-[#dfca70]" : ""
          }`}
        >
          <ArrowUpAz />
          <span>ABC</span>
        </button>
        {/* Passe fetchClients au dialogue de création */}
        <CreateClientDialog onClientCreated={() => fetchClients(search)} />
      </div>

      {/* Barre de recherche visible uniquement si searchActive */}
      {searchActive && (
        <div className="bg-[#ededed] border-b border-gray-300 m-0 p-2">
          <div className="flex">
            <div className="relative bg-white">
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-60 h-8 pl-3 pr-3 border border-gray-400 border-r-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#006680] focus:border-[#006680]"
              />
            </div>
            <button
              onClick={() => fetchClients(search)}
              className="h-8 px-3 bg-[#006680] text-white hover:bg-[#008099] transition-colors border border-[#006680]"
              title="Rechercher"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center m-0 p-2">
        <div>
          <span>Tous les {displayedClients.length} clients</span>
        </div>
        <Link
          href="/dashboard/clients/map"
          className=" flex flex-col items-center px-4 py-2 text-sm font-medium hover:text-[#dfca70] transition"
        >
          <Map />
          Carte
        </Link>
      </div>

      {/* Passe clients triés (ou non) et fetchClients à ClientTable */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ClientTable
          clients={displayedClients}
          onClientUpdated={() => fetchClients(search)}
        />
      )}
    </div>
  );
}
