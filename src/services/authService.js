import api from './api';

export const login = async(credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};


export const register = async(userData) => {
    try {
        const response = await api.post('/auth/register', userData); // POST /api/auth
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const forgotPassword = async(data) => {
    try {
        const response = await api.post('/auth/password/forgot-password', {
            email: data.email
        });
        return {
            success: true,
        };
    } catch (error) {
        throw new Error(
            (error.response && error.response.data && error.response.data.message) ||
            'Network error'
        );


    }
};


export const resetPassword = (code, newPassword) => {
    return api.post('/auth/password/reset-password', { code, newPassword });
}