const { contextBridge } = require("electron");

const API_BASE = "http://localhost:8000";

contextBridge.exposeInMainWorld("backend", {

  login: async (data) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });
    return res.json();
  },

  dashboard: async () => {
    const res = await fetch(`${API_BASE}/user/dashboard`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    return res.json();
  },

  streak: async () => {
    const res = await fetch(`${API_BASE}/user/streak`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    return res.json();
  },

  skills: {
    get: async () => {
      const res = await fetch(`${API_BASE}/skills`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      return res.json();
    }
  }

});
