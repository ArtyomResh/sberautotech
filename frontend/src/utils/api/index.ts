import { IRegistrationRequest } from './types';

const taxiAuthApiRoot = process.env.GATSBY_TAXI_AUTH_API_URL || '/auth-taxi';

const apiRoutes = {
    registrationForBeta: `${taxiAuthApiRoot}/api/v1/registration/site`
};

export const api = {
    registrationForBeta: (data: IRegistrationRequest) => {
        return fetch(apiRoutes.registrationForBeta, {
            method : 'POST',
            body   : JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).then((response) => {
            if(!response.ok) {
                return response.json().then((data) => {
                    return Promise.reject(data);
                });
            }

            return Promise.resolve();
        });
    }
};
