import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // ================= HEADERS =================
  _getHeaders() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // ================= REQUEST =================
  async makeRequest(endpoint, method, body = null) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers: this._getHeaders(),
      body: body ? JSON.stringify(body) : null,
    });

    if (res.ok) {
      return res.json();
    }

    const err = await res.json().catch(() => ({}));
    return Promise.reject(err.message || `Error ${res.status}`);
  }

  // ================= USER =================
  getUserInfo() {
    return this.makeRequest("/users/me", "GET");
  }

  editUserInfo(data) {
    return this.makeRequest("/users/me", "PATCH", data);
  }

  updateAvatar(avatar) {
    return this.makeRequest("/users/me/avatar", "PATCH", { avatar });
  }

  // ================= CARDS =================
  getInitialCards() {
    return this.makeRequest("/cards", "GET");
  }

  addCard(data) {
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

const api = new Api({ baseUrl: BASE_URL });
export default api;
