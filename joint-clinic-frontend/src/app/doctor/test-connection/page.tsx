"use client";

import React, { useState, useEffect } from "react";
import { getDoctorById } from "@/lib/api/doctor.api";
import api from "@/lib/api/axios";

export default function DiagnosticPage() {
    const [envVar, setEnvVar] = useState<string>("");
    const [apiBase, setApiBase] = useState<string>("");
    const [fetchResult, setFetchResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setEnvVar(process.env.NEXT_PUBLIC_BASE_URL || "UNDEFINED");
        setApiBase(api.defaults.baseURL || "UNDEFINED");
    }, []);

    const runTest = async () => {
        try {
            setError(null);
            setFetchResult("Loading...");
            // Direct call to verify axios instance
            const res = await getDoctorById("HLC-PRAC-2022-00001");
            setFetchResult(res);
        } catch (err: any) {
            console.error(err);
            setError({
                message: err.message,
                config: {
                    url: err.config?.url,
                    baseURL: err.config?.baseURL,
                    method: err.config?.method
                },
                response: err.response?.data,
                status: err.response?.status
            });
            setFetchResult(null);
        }
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">API Connectivity Diagnostic</h1>

            <div className="border p-4 rounded bg-gray-50">
                <h2 className="font-bold">Environment Configuration</h2>
                <p><strong>process.env.NEXT_PUBLIC_BASE_URL:</strong> {envVar}</p>
                <p><strong>axios.defaults.baseURL:</strong> {apiBase}</p>
            </div>

            <button
                onClick={runTest}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Run GET /api/doctor/HLC-PRAC-2022-00001
            </button>

            {fetchResult && (
                <div className="border p-4 rounded bg-green-50">
                    <h3 className="font-bold text-green-700">Success</h3>
                    <pre className="text-xs overflow-auto max-h-60 mt-2">
                        {JSON.stringify(fetchResult, null, 2)}
                    </pre>
                </div>
            )}

            {error && (
                <div className="border p-4 rounded bg-red-50">
                    <h3 className="font-bold text-red-700">Error</h3>
                    <pre className="text-xs overflow-auto max-h-60 mt-2 text-red-600">
                        {JSON.stringify(error, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
