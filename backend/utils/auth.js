export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// 🔹 Registro
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// 🔹 Login / Autorización
export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// 🔹 Verificar token (esta es la función que faltaba)
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
