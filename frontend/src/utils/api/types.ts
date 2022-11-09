export interface IRegistrationRequest {
    phone_number: string,
    email: string,
    username: string,
    phone_model: 'ios' | 'android' | 'other',
    residence_area: 'krylatskoye' | 'other',
    is_adult: boolean,
    is_processing_personal_data_allowed: boolean
}
