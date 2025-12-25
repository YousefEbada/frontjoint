import api from "./axios"


export const getDoctors = async () => {
    try {
        const response = await api.get('/doctor')
        console.log('getDoctors response:', response.data.doctors.slice(0, 5))
        return response.data.doctors
    } catch (error) {
        console.error('Error fetching doctors:', (error as any).response?.data || (error as any).message)
    }
}

export const getDoctorById = async (doctorId: string) => {
    try {
        const response = await api.get(`/doctor/${doctorId}`)
        console.log('getDoctorById response:', response.data)
        return response.data.doctor
    } catch (error) {
        console.error('Error fetching doctor by ID:', (error as any).response?.data || (error as any).message)
    }
}

export const testAuth = () => {
    console.log('Testing getDoctors...')
    getDoctors()
}