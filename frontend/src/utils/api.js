class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Siempre obtener token actualizado
  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  // Método genérico
  makeRequest(endPoint, method, body = null) {
    return fetch(`${this._baseUrl}${endPoint}`, {
      method,
      headers: this._getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Cargar usuario
  getUserInfo() {
    return this.makeRequest("/users/me", "GET");
  }

  // Cargar tarjetas
  getInitialCards() {
    return this.makeRequest("/cards", "GET");
  }

  // Editar perfil
  editUserInfo(data) {
    return this.makeRequest("/users/me", "PATCH", data);
  }

  // Nueva tarjeta
  addNewCard(data) {
    return this.makeRequest("/cards", "POST", data);
  }

  // Likes
  addLike(cardId) {
    return this.makeRequest(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this.makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }

  // Eliminar card
  deleteCard(cardId) {
    return this.makeRequest(`/cards/${cardId}`, "DELETE");
  }

  // Actualizar avatar
  updateAvatar(avatarUrl) {
    return this.makeRequest("/users/me/avatar", "PATCH", {
      avatar: avatarUrl,
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
