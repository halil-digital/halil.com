"use client";

import { Client } from "@/models/client.model";
import { getAllClients } from "@/services/client.service";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ClientTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllClients()
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Chargement...</p>;

  return (
    <div className="py-6">
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
