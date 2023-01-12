import React, { useEffect } from 'react';
import privacyPolicyDocLink from '../../static/docs/Политика_в_области_обработки_и_защиты_персональных_данных_0_5.pdf';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.location.href = privacyPolicyDocLink;
    }, []);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment></React.Fragment>;
};

export default PrivacyPolicy;
