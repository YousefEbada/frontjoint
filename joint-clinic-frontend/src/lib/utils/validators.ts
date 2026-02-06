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
    // Strict check: Must be digits only
    if (!/^\d+$/.test(phone)) return false;
    // Check if lengths is at least 9
    return phone.length >= 9;
};

/**
 * Validates Saudi National ID or Iqama ID.
 * Length must be 10 digits.
 * National ID starts with '1'.
 * Iqama starts with '2'.
 */
export const isValidSaudiID = (id: string, type: string): boolean => {
    // Passport can allow alphanumeric, usually checking length is enough for basic validation
    if (type === 'Passport') {
        return id.length >= 6;
    }

    // For National ID and Iqama, strictly numbers only
    if (!/^\d+$/.test(id)) return false;

    // National ID: Starts with 1, Min length 10
    if (type === 'National ID') {
        return id.startsWith('1') && id.length >= 10;
    }

    // Iqama: Starts with 2, Min length 10
    if (type === 'Iqama') {
        return id.startsWith('2') && id.length >= 10;
    }

    return false;
};
