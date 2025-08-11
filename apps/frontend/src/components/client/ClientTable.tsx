import { Client } from "@/models/client.model";
import { getAllClients } from "@/services/client.service";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  onClientUpdated?: () => void;
};

export default function ClientTable({ onClientUpdated }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = () => {
    setLoading(true);
    getAllClients()
      .then(setClients)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Fonction pour recharger après update ou suppression
  const handleClientUpdated = () => {
    fetchClients();
    if (onClientUpdated) onClientUpdated();
  };

  if (loading) return <p className="text-sm text-gray-500">Chargement...</p>;

  return (
    <div className="px-2">
      {/* Bien appeler columns en passant handleClientUpdated */}
      <DataTable columns={columns(handleClientUpdated)} data={clients} />
    </div>
  );
}
