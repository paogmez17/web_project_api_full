// frontend/src/utils/api.js

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Obtiene los headers con JWT
  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  // Método genérico para hacer fetch
  makeRequest(endPoint, method, body = null) {
    return fetch(`${this._baseUrl}${endPoint}`, {
      method,
      headers: this._getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", // importante si se usan cookies
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // ---------------- Métodos de usuarios ----------------
  getUserInfo() {
    return this.makeRequest("/users/me", "GET");
  }

  editUserInfo(data) {
    return this.makeRequest("/users/me", "PATCH", data);
  }

  updateAvatar(avatarUrl) {
    return this.makeRequest("/users/me/avatar", "PATCH", { avatar: avatarUrl });
  }

  // ---------------- Métodos de tarjetas ----------------
  getInitialCards() {
    return this.makeRequest("/cards", "GET");
  }

  addNewCard(data) {
    return this.makeRequest("/cards", "POST", data);
  }

  deleteCard(cardId) {
    return this.makeRequest(`/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this.makeRequest(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this.makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }
}

// 🔹 Configuración del backend remoto
const api = new Api({
  baseUrl: "http://34.121.100.25/api", // apunta a tu backend remoto
});

export default api;
