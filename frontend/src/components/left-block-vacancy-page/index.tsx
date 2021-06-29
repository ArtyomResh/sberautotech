import React, { useCallback, useContext, useMemo } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { appContext } from '../../context/context';

import style from '../../pages/vacancy.css';

import Button from '../button';

import ArrowLeft from '../../images/arrow-left.inline.svg';
import FaceBookIcon from '../../images/facebook-icon.inline.svg';
import TwitterIcon from '../../images/twitter-icon.inline.svg';
import VKIcon from '../../images/vk-icon.inline.svg';
import ShareLinkIcon from '../../images/share-link-icon.inline.svg';

const LeftBlockVacancyPage = ({ city, jobType, backToPreviousPage }) => {
    const cn = useClassnames(style);

    const { setIsPopupVisible } = useContext(appContext);

    const urlHref = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

    const URLCopier = useCallback(() => {
        void navigator.clipboard.writeText(urlHref);
    }, []);

    return (
        <React.Fragment>
            <div className={cn('vacancy__left-block-header')}>
                <ArrowLeft
                    className={cn('vacancy__left-block-arrow-left')}
                    onClick={backToPreviousPage}
                />
                <h1>Вакансия</h1>
            </div>
            <div className={cn('vacancy__left-block-main')}>
                <ul className={cn('vacancy__title-wrapper')}>
                    <li>{city.text}</li>
                    <li>{jobType.duration}</li>
                    <li>{jobType.text}</li>
                    <li>Офис</li>
                    <Button
                        onClick={() => setIsPopupVisible(true)}
                        className={cn('vacancy__respond-button')}
                        label="Откликнуться"
                    />
                </ul>
            </div>
            <div className={cn('vacancy__left-block-bottom')}>
                <div className={cn('vacancy__link-wrapper')}>
                    <a href={`http://www.facebook.com/share.php?u=${urlHref}`}><FaceBookIcon /></a>
                    <a href={`http://twitter.com/intent/tweet?status=${urlHref}`}><TwitterIcon /></a>
                    <a href={`http://vk.com/share.php?url=${urlHref}`}><VKIcon /></a>
                    <a onClick={URLCopier} ><ShareLinkIcon /></a>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LeftBlockVacancyPage;
