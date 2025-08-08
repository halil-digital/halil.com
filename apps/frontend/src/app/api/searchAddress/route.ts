import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&limit=5`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "MonApp/1.0 (contact@monapp.com)", // Obligatoire par Nominatim
      "Accept-Language": "fr",
    },
  });

  if (!res.ok) {
    return new Response("Erreur lors de la récupération des adresses", {
      status: res.status,
    });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
