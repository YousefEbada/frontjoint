import axios from 'axios';
import {
    CreateFullUserDTO,
    CreatePartialUserDTO,
    RequestOtpDTO,
    VerifyOtpDTO
} from './schemas';

// Backend base URL
const API_URL = 'https://jointclinic-backend-decqdgfzc9f3bzd6.canadacentral-01.azurewebsites.net/';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {
    // =========================
    // Find user by contact
    // POST /api/auth/find
    // =========================
    findUser: async (contact: string) => {
        try {
            const response = await apiClient.get('/auth/find', {
                params: {
                    contact,
                },
            });
            return response.data;
        } catch (error) {
            console.error('findUser error:', error);
            throw error;
        }
    },

    // =========================
    // Create partial user
    // POST /api/auth/create-partial
    // =========================
    createPartialUser: async (data: CreatePartialUserDTO) => {
        try {
            const response = await apiClient.post('/auth/create-partial', data);
            return response.data;
        } catch (error) {
            console.error('createPartialUser error:', error);
            throw error;
        }
    },

    // =========================
    // Create full user
    // POST /api/auth/create-full
    // =========================
    createFullUser: async (data: CreateFullUserDTO) => {
        try {
            const response = await apiClient.post('/auth/create-full', data);
            return response.data;
        } catch (error) {
            console.error('createFullUser error:', error);
            throw error;
        }
    },

    // =========================
    // Request OTP
    // POST /api/auth/otp/request
    // =========================
    requestOtp: async (data: RequestOtpDTO) => {
        try {
            const response = await apiClient.post('/auth/otp/request', data);
            return response.data;
        } catch (error) {
            console.error('requestOtp error:', error);
            throw error;
        }
    },

    // =========================
    // Verify OTP
    // POST /api/auth/otp/verify
    // =========================
    verifyOtp: async (data: VerifyOtpDTO) => {
        try {
            const response = await apiClient.post('/auth/otp/verify', data);
            return response.data;
        } catch (error) {
            console.error('verifyOtp error:', error);
            throw error;
        }
    },
};
