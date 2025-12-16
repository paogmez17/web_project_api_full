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
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // ---------------- Usuarios ----------------
  getUserInfo() {
    return this.makeRequest("/users/me", "GET");
  }

  editUserInfo(data) {
    return this.makeRequest("/users/me", "PATCH", data);
  }

  updateAvatar(avatarUrl) {
    return this.makeRequest("/users/me/avatar", "PATCH", {
      avatar: avatarUrl,
    });
  }

  // ---------------- Tarjetas ----------------
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

// 🔹 Backend en Google Cloud
const api = new Api({
  baseUrl: "http://34.121.100.25:3000",
});

export default api;
