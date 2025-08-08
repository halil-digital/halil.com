"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SendClient } from "@/payload/request/send-client";
import { AddressSuggestion } from "@/services/address.service";
import { createClient } from "@/services/client.service";
import { Plus } from "lucide-react";
import { useState } from "react";
import AutoCompletedAddress from "../address/AutoCompletedAddress";

type Props = {
  onClientCreated: () => void;
};

export default function CreateClientDialog({ onClientCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<SendClient>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdresseSelect = (addr: AddressSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: addr.label,
      lat: addr.lat,
      lon: addr.lon,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(formData);
      setFormData({ name: "", email: "", phone: "", address: "" });
      setOpen(false);
      onClientCreated();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erreur : " + err.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 px-4 py-2 bg-[#ebc834] hover:bg-[#dfca70] text-white rounded cursor-pointer">
          <Plus size={20} />
          Ajouter un client
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un client</DialogTitle>
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
              Créer
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
