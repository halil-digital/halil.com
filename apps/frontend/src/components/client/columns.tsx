import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Client } from "@/models/client.model";
import { deleteClient } from "@/services/client.service";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UpdateClientDialog from "./UpdateClientDialog";

type ActionsCellProps = {
  client: Client;
  onClientUpdated?: () => void;
};

export function ActionsCell({ client, onClientUpdated }: ActionsCellProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <UpdateClientDialog
        client={client}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClientUpdated={onClientUpdated}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Link href={`/dashboard/clients/${client.id}`}>Voir plus</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              const confirmed = window.confirm(
                `Voulez-vous vraiment supprimer le client "${client.name}" ?`
              );
              if (!confirmed) return;
              try {
                await deleteClient(client.id);
                if (onClientUpdated) onClientUpdated();
              } catch (error) {
                if (error instanceof Error) {
                  alert("Erreur : " + error.message);
                }
              }
            }}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const columns = (onClientUpdated?: () => void): ColumnDef<Client>[] => [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell client={row.original} onClientUpdated={onClientUpdated} />
    ),
  },
];
