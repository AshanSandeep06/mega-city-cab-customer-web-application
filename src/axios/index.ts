import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

// Request Interceptor
Axios.interceptors.request.use(
    (config) => {
        if (config.headers) {
            // config.headers["Content-Type"] = 'application/json';
            config.headers.Authorization = `Bearer ${localStorage.getItem('customer_token')}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
Axios.interceptors.response.use(
    (response) => {
        // Modify the response here
        return response;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
