import { API } from "./authservices";

// ── Axios request interceptor ────────────────────────────────────────
// Automatically attach the Bearer token from localStorage to every
// outgoing request so the server's authMiddleware can verify identity.
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Axios response interceptor ───────────────────────────────────────
// If the server returns 401 (expired / invalid token) clear the
// stored credentials and redirect to login so the user can re-auth.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ── GET  /api/readings ───────────────────────────────────────────────
// Accepts query filters: ?page=1&limit=20&date=YYYY-MM-DD&slot=morning
export const getReadings = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.page !== undefined) params.append("page", filters.page);
  if (filters.limit !== undefined) params.append("limit", filters.limit);
  if (filters.date) params.append("date", filters.date);
  if (filters.slot && filters.slot !== "all") params.append("slot", filters.slot);

  const query = params.toString();
  const url = query ? `/api/readings?${query}` : "/api/readings";

  const response = await API.get(url);
  return response.data;
};

// ── POST  /api/readings ──────────────────────────────────────────────
export const createReading = async (readingData) => {
  const response = await API.post("/api/readings", readingData);
  return response.data.reading ?? response.data;
};

// ── PUT  /api/readings/:id ───────────────────────────────────────────
export const updateReading = async (id, readingData) => {
  const response = await API.put(`/api/readings/${id}`, readingData);
  return response.data.reading ?? response.data;
};

// ── DELETE  /api/readings/:id ────────────────────────────────────────
export const deleteReading = async (id) => {
  const response = await API.delete(`/api/readings/${id}`);
  return response.data;
};
