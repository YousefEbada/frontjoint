import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
    getAvailableSlots,
    createBooking,
    savePendingBooking,
    getPendingBooking,
    clearPendingBooking,
    isPatientAuthenticated,
    PendingBookingData,
} from "@/lib/api/booking.api";
import { CreateBookingPayload } from "@/types/booking";
//yuuyuyyuyuvfvfvvf
export const useAvailableSlots = (
    doctorId: string,
    fromDate?: string,
    toDate?: string
) => {
    return useQuery({
        queryKey: ["available-slots", doctorId, fromDate, toDate],
        queryFn: () => getAvailableSlots(doctorId, fromDate, toDate),
        enabled: !!doctorId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookingData: CreateBookingPayload) => createBooking(bookingData),
        onSuccess: () => {
            // Invalidate slots queries to refresh availability
            queryClient.invalidateQueries({ queryKey: ["available-slots"] });
            // Clear pending booking on success
            clearPendingBooking();
        },
    });
};

// Hook for managing pending booking flow with authentication
export const usePendingBooking = () => {
    const router = useRouter();
    const [pendingBooking, setPendingBooking] = useState<PendingBookingData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load pending booking and auth status on mount
    useEffect(() => {
        setPendingBooking(getPendingBooking());
        setIsAuthenticated(isPatientAuthenticated());
    }, []);

    // Save booking and redirect based on auth status
    const initiateBooking = useCallback((bookingData: PendingBookingData) => {
        // Save the pending booking data
        savePendingBooking(bookingData);
        setPendingBooking(bookingData);

        // Check authentication and redirect
        if (isPatientAuthenticated()) {
            // User is authenticated, redirect to dashboard booking
            router.push("/patient/booking");
        } else {
            // User is not authenticated, redirect to sign-in
            // The sign-in flow should redirect to /patient/booking after completion
            router.push("/sign-in?redirect=/patient/booking");
        }
    }, [router]);

    // Clear pending booking
    const cancelPendingBooking = useCallback(() => {
        clearPendingBooking();
        setPendingBooking(null);
    }, []);

    // Refresh pending booking from localStorage
    const refreshPendingBooking = useCallback(() => {
        setPendingBooking(getPendingBooking());
        setIsAuthenticated(isPatientAuthenticated());
    }, []);

    return {
        pendingBooking,
        isAuthenticated,
        initiateBooking,
        cancelPendingBooking,
        refreshPendingBooking,
    };
};
