import { IRegistrationRequest } from './types';

const apiRoot = `${process.env.GATSBY_API_URL}/api`;

export const strapiAPIRoutes = {
    registrationForBeta: `${apiRoot}/sign-up`
};

export const api = {
    registrationForBeta: (data: IRegistrationRequest) => {
        console.log('registration request data', data);

        return Promise.resolve('');
        // return fetch(strapiAPIRoutes.registrationForBeta, {
        //     method: 'POST',
        //     body  : JSON.stringify(data)
        // });
    }
};
