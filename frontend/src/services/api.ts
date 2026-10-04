const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export async function api<T>(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) throw new Error((await res.text()) || "Request failed");
  return res.json() as Promise<T>;
}
