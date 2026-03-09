import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * REQUEST INTERCEPTOR:
 * Inserisce automaticamente il JWT nell'Header Authorization
 * per ogni chiamata in uscita.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR:
 * Gestisce le risposte dal server. Se riceviamo un 401 (Token scaduto o non valido),
 * facciamo il logout automatico per sicurezza.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Sessione scaduta o non autorizzata. Reindirizzamento al login...");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Opzionale: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;