export type AddressSuggestion = {
  label: string;
  lat: number;
  lon: number;
};

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export async function searchAdresse(
  query: string
): Promise<AddressSuggestion[]> {
  if (query.length < 3) return [];

  const res = await fetch(`/api/searchAddress?q=${encodeURIComponent(query)}`);

  if (!res.ok) throw new Error("Erreur lors de la récupération des adresses");

  const data = await res.json();

  return data.map((item: NominatimResult) => ({
    label: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }));
}
