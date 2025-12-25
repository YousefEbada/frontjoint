import { getDoctors } from "@/lib/api/doctor.api";
import { useEffect, useState } from "react";

export const useDoctors = () => {
    // i should use tanstack query instead but i will see where this will reach
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getDoctors()
        .then(setDoctors)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    return {doctors, loading, error};
}