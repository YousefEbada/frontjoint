import { NixpendPort } from "../../../integration/ports/NixpendPorts.js";
import { nixpendAdapter } from "../../../integration/adapters/nixpend.adapter.js";
import { env } from "../../../../config/env.js";
import { AvailableSlotReturnType } from "../../../integration/domain/Nixpend.js";

export const fixedNixpendAdapter: NixpendPort = {
    ...nixpendAdapter,
    async getAvailableSlots(practitionerId: string, company: "Joint Clinic" = 'Joint Clinic', fromDate?: string, toDate?: string): Promise<AvailableSlotReturnType> {
        console.log("\n\n======= [Fixed] Practitioner ID:", practitionerId, "\n\n");

        // Construct the URL safely using URLParams to handle encoding and avoid malformed URLs
        const url = new URL(`${env.NIXPEND_API_URL}/nis/external/available_slots`);
        url.searchParams.append('practitioner', practitionerId);
        url.searchParams.append('company', company);
        if (fromDate) url.searchParams.append('from_date', fromDate);
        if (toDate) url.searchParams.append('to_date', toDate);

        console.log("[Fixed] Fetching URL:", url.toString());

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': env.NIXPEND_TOKEN
                }
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("[Fixed] Failed to parse JSON response");
                return { data: [] };
            }

            console.log("\n======= [Fixed] Available Slots Data Response:", JSON.stringify(data));

            if (data && data.response) {
                if (data.response.msg && typeof data.response.msg === 'string' && data.response.msg.toLowerCase().includes('invalid')) {
                    throw new Error(`Nixpend Error: ${data.response.msg}`);
                }
                if (data.response.message && Array.isArray(data.response.message)) {
                    return { data: data.response.message };
                }
            }

            return { data: [] };
        } catch (error) {
            console.error("[Fixed] Error fetching slots:", error);
            throw error;
        }
    }
};
