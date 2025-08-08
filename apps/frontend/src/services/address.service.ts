import { ApiAdresseResponse } from "@/payload/response/address-response";

export type AddressSuggestion = {
  label: string;
  lat: number;
  lon: number;
};

export async function searchAdresse(
  query: string
): Promise<AddressSuggestion[]> {
  if (query.length < 3) return [];

  const res = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
      query
    )}&limit=5`
  );

  if (!res.ok) throw new Error("Erreur lors de la récupération des adresses");

  const data: ApiAdresseResponse = await res.json();

  return data.features.map((f) => ({
    label: f.properties.label,
    lat: f.geometry.coordinates[1],
    lon: f.geometry.coordinates[0],
  }));
}
