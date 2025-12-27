import { useState, useEffect, useCallback } from 'react';
import {
    getPatientDashboard,
    getPatientById,
    getPatientByUserId,
    PatientDashboardData,
    Patient
} from '@/lib/api/patient.api';

interface UsePatientDashboardReturn {
    dashboardData: PatientDashboardData['data'] | null;
    hasActiveTreatment: boolean;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UsePatientReturn {
    patient: Patient | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch patient dashboard data
 * Handles the case when patient has no active treatment (first time users)
 */
export const usePatientDashboard = (patientId: string | null): UsePatientDashboardReturn => {
    const [dashboardData, setDashboardData] = useState<PatientDashboardData['data'] | null>(null);
    const [hasActiveTreatment, setHasActiveTreatment] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        if (!patientId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getPatientDashboard(patientId);
            setDashboardData(response.data);
            setHasActiveTreatment(response.data.hasActiveTreatment);
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Failed to fetch dashboard data';
            setError(msg);
            // Default to no active treatment on error
            setHasActiveTreatment(false);
            setDashboardData({ hasActiveTreatment: false, message: msg });
        } finally {
            setIsLoading(false);
        }
    }, [patientId]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboardData,
        hasActiveTreatment,
        isLoading,
        error,
        refetch: fetchDashboard
    };
};

/**
 * Hook to fetch patient data by patient ID
 */
export const usePatient = (patientId: string | null): UsePatientReturn => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPatient = useCallback(async () => {
        if (!patientId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getPatientById(patientId);
            setPatient(data);
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Failed to fetch patient data';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }, [patientId]);

    useEffect(() => {
        fetchPatient();
    }, [fetchPatient]);

    return {
        patient,
        isLoading,
        error,
        refetch: fetchPatient
    };
};

/**
 * Hook to fetch patient data by user ID
 */
export const usePatientByUserId = (userId: string | null): UsePatientReturn => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPatient = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getPatientByUserId(userId);
            setPatient(data);
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Failed to fetch patient data';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchPatient();
    }, [fetchPatient]);

    return {
        patient,
        isLoading,
        error,
        refetch: fetchPatient
    };
};
