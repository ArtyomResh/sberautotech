import React, { useCallback, useContext, useMemo, useEffect, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { appContext } from '../../context/context';

import style from '../../pages/vacancy.css';

import Button from '../button';
import Tooltip from '../tooltip';

import { IStrapiVacancies } from '../../pages/vacancy';

import ArrowLeft from '../../images/arrow-left.inline.svg';
import FaceBookIcon from '../../images/facebook-icon.inline.svg';
import TwitterIcon from '../../images/twitter-icon.inline.svg';
import VKIcon from '../../images/vk-icon.inline.svg';
import ShareLinkIcon from '../../images/share-link-icon.inline.svg';

interface IProps {
    backToPreviousPage: () => void
}

const LeftBlockVacancyPage = ({ city, jobType, backToPreviousPage, title }: IStrapiVacancies & IProps) => {
    const cn = useClassnames(style);

    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const { setIsPopupVisible, setVacancyTitle, vacancyTitle } = useContext(appContext);

    const urlHref = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

    const URLCopier = useCallback(() => {
        void navigator.clipboard.writeText(urlHref);
        setTooltipIsOpen(true);
        setTimeout(() => {
            setTooltipIsOpen(false);
        }, 1000);
    }, []);

    const setIsPopupVisibleHandler = useCallback(() => {
        setIsPopupVisible(true);
        setVacancyTitle(title);
    }, [vacancyTitle]);

    useEffect(() => {
        return () => {
            setVacancyTitle('');
        };
    }, [vacancyTitle]);

    return (
        <React.Fragment>
            <div className={cn('vacancy__left-block-top-wrapper')}>
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
                            onClick={setIsPopupVisibleHandler}
                            className={cn('vacancy__respond-button')}
                            label="Откликнуться"
                        />
                    </ul>
                </div>
            </div>
            <div className={cn('vacancy__left-block-bottom')}>
                <div className={cn('vacancy__link-wrapper')}>
                    <a target="_blank" href={`http://www.facebook.com/share.php?u=${urlHref}`}><FaceBookIcon /></a>
                    <a target="_blank" href={`http://twitter.com/intent/tweet?status=${urlHref}`}><TwitterIcon /></a>
                    <a target="_blank" href={`http://vk.com/share.php?url=${urlHref}`}><VKIcon /></a>
                    <a onClick={URLCopier} ><ShareLinkIcon /></a>
                </div>
                {tooltipIsOpen ? <Tooltip label="Скопировано" /> : null}
            </div>
        </React.Fragment>
    );
};

export default LeftBlockVacancyPage;
