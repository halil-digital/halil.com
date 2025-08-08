import { User } from "@/models/user.model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "ngrok-skip-browser-warning": "true",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function getAuthenticatedUser(): Promise<User> {
  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers,
  });
  if (!res.ok) {
    throw new Error("Impossible de récupérer l'utilisateur connecté");
  }
  return res.json();
}

export async function getAllUsers(): Promise<User[]> {
  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };
  const res = await fetch(`${API_BASE_URL}/users/`, {
    headers,
  });
  if (!res.ok) {
    throw new Error("Impossible de récupérer tous les utilisateurs");
  }
  return res.json();
}
