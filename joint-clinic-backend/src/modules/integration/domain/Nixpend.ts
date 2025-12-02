export type registerType = {
  first_name: string, 
  last_name: string, 
  nationality: string, 
  mobile: string, 
  sex: string
  middle_name?: string,
  patient_name?: string,
  dob?: string,
  verified?: number,
  first_name_a?: string,
  middle_name_a?: string,
  last_name_a?: string,
  full_name_in_arabic?: string,
  hijri_date_of_birth?: string,
  nid_or_iqama_id?: string,
  country?: string,
  occupation?: string,
  id_type?: string,
  patient_source?: string,
  second_mobile_number?: string,
  marital_status_2?: string,
  city?: string,
  address?: string,
  email?: string,
  speaking_language?: string,
  patient_category?: string,
  patient_religion?: string,
  blood_group?: string
};

export type updateType = {
  occupation: string,
  email: string,
  speaking_language: string,
  country: string,
  city: string,
  address: string,
  marital_status_2: 'Single' | 'Married' | 'Divorced' | 'Widow',
  mobile: string,
  second_mobile_number: string
}

export type bookType = {
  practitioner: string,
  appointment_type: string,
  department: string,
  duration: number,
  daily_practitioner_event: string,
  appointment_date: string,
  appointment_time: string,
  patient: string,
  company: string
};

export type cancelType = {
  appointment_id: string,
  cancellation_source: string,
  cancellation_date: string,
  cancellation_reason: string,
  cancelled_by: string
};

export type fetchType = 'nid_or_iqama_id' | 'mobile';