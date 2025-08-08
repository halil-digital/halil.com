"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "@/models/client.model";
import { SendClient } from "@/payload/request/send-client";
import { AddressSuggestion } from "@/services/address.service";
import { updateClient } from "@/services/client.service";
import { useEffect, useState } from "react";
import AutoCompletedAddress from "../address/AutoCompletedAddress";

type Props = {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UpdateClientDialog({
  client,
  open,
  onOpenChange,
}: Props) {
  const [formData, setFormData] = useState<SendClient>({
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
  });

  // Reset formData si le client change ou le dialog s'ouvre
  useEffect(() => {
    if (open) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
    }
  }, [client, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdresseSelect = (addr: AddressSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: addr.label,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClient(client.id, formData);
      onOpenChange(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erreur : " + err.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le client</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nom"
            className="w-full border px-3 py-2 rounded"
          />
          <AutoCompletedAddress
            value={formData.address}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, address: val }))
            }
            onSelect={handleAdresseSelect}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Téléphone"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#ebc834] text-white rounded hover:bg-[#dfca70] cursor-pointer"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
