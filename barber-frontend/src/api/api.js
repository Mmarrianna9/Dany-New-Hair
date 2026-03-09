import axios from 'axios';

// Creiamo un'istanza di Axios configurata per il tuo backend Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Assicurati che la porta sia quella corretta del backend
});

// Questo interceptor aggiunge AUTOMATICAMENTE il token JWT ad ogni chiamata
// Così non dobbiamo scriverlo a mano ogni volta che vogliamo prenotare o aggiungere un barbiere
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;