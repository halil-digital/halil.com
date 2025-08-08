"use client";

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
import { useState } from "react";
import UpdateClientDialog from "./UpdateClientDialog";

function ActionsCell({ client }: { client: Client }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <UpdateClientDialog
        client={client}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const confirmed = window.confirm(
                `Voulez-vous vraiment supprimer le client "${client.name}" ?`
              );
              if (!confirmed) return;
              try {
                await deleteClient(client.id);
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

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell client={row.original} />,
  },
];
