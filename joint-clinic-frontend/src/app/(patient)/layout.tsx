import React from "react";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {/* Patient Shell // Sidebar / Header */}
            {children}
        </section>
    );
}
