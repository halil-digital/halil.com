import { LoginCredentials } from "@/payload/request/login-credentials";
import { LoginResponse } from "@/payload/response/login-response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.detail == "Bad credentials") {
      throw new Error("Email ou mot de passe invalide");
    }
    throw new Error("Une erreur s'est produite. Veuillez réessayer plus tard");
  }

  return res.json();
}
