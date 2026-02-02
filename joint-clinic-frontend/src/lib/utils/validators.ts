/**
 * Validates if the email format is correct.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates if the phone number is a valid Saudi number.
 * Must start with 966 and be 12 digits long in total (e.g. 9665XXXXXXXX).
 */
export const isValidSaudiPhone = (phone: string): boolean => {
    // Remove any non-digit characters just in case, though usually we expect clean input or we clean it
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if starts with 966 and length is 12
    return cleanPhone.startsWith('966') && cleanPhone.length === 12;
};

/**
 * Validates Saudi National ID or Iqama ID.
 * Length must be 10 digits.
 * National ID starts with '1'.
 * Iqama starts with '2'.
 */
export const isValidSaudiID = (id: string, type: string): boolean => {
    const cleanId = id.replace(/\D/g, '');

    // User Update: Not mandatory to start with 1. Min 9 digits for National ID.
    // However, basic sanity check for length < 9 generally returns false.
    if (cleanId.length < 9) return false;

    if (type === 'National ID') {
        return cleanId.length >= 9;
    }

    if (type === 'Iqama') {
        // Keep strictly 10 and starts with 2 unless requested otherwise.
        return cleanId.length === 10 && cleanId.startsWith('2');
    }

    if (type === 'Passport') {
        return cleanId.length >= 6; // Basic check for passport
    }

    return false;
};
