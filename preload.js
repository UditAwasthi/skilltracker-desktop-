const { contextBridge } = require("electron");

// request wrapper
async function api(path, method = "GET", body = null) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

contextBridge.exposeInMainWorld("backend", {
  login: (payload) => api("/auth/login", "POST", payload),
  dashboard: () => api("/user/dashboard"),
  skills: {
    get: () => api("/skills"),
    add: (payload) => api("/skills", "POST", payload),
  },
  streak: () => api("/user/streak", "GET"),
  logout: () => localStorage.removeItem("token"),
});
