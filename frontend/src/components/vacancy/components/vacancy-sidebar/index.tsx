import React, { useCallback, useMemo, useState } from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import Tooltip from '../../../tooltip';
import ButtonWrapper from '../button-wrapper';

import { IStrapiVacancies } from '../../../../pages/vacancy';

import ArrowLeft from '../../../../images/arrow-left.inline.svg';
import FaceBookIcon from '../../../../images/facebook-icon.inline.svg';
import TwitterIcon from '../../../../images/twitter-icon.inline.svg';
import VKIcon from '../../../../images/vk-icon.inline.svg';
import ShareLinkIcon from '../../../../images/share-link-icon.inline.svg';

import styles from './index.css';

interface IProps {
    backToPreviousPage: () => void
}

const VacancySidebar = ({ city, jobType, backToPreviousPage, title, huntflowId }: IStrapiVacancies & IProps) => {
    const cn = useClassnames(styles);

    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

    const urlHref = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

    const URLCopier = useCallback(() => {
        void navigator.clipboard.writeText(urlHref);
        setTooltipIsOpen(true);
        setTimeout(() => {
            setTooltipIsOpen(false);
        }, 1000);
    }, []);

    return (
        <div className={cn('vacancy-sidebar')}>
            <div>
                <div className={cn('vacancy-sidebar__header')}>
                    <ArrowLeft
                        className={cn('vacancy-sidebar__icon-arrow-left')}
                        onClick={backToPreviousPage}
                    />

                    <h1>Вакансия</h1>
                </div>

                <div className={cn('vacancy-sidebar__main')}>
                    <ul className={cn('vacancy-sidebar__list')}>
                        <li>{city.text}</li>
                        <li>{jobType.duration}</li>
                        <li>{jobType.text}</li>
                        <li>Офис</li>
                    </ul>

                    <ButtonWrapper
                        className={cn('vacancy-sidebar__button-respond')}
                        title={title}
                        huntflowId={huntflowId}
                    >
                        Откликнуться
                    </ButtonWrapper>
                </div>
            </div>

            <div className={cn('vacancy-sidebar__bottom')}>
                <div className={cn('vacancy-sidebar__links-wrapper')}>
                    <a target="_blank" href={`http://www.facebook.com/share.php?u=${urlHref}`}><FaceBookIcon /></a>
                    <a target="_blank" href={`http://twitter.com/intent/tweet?status=${urlHref}`}><TwitterIcon /></a>
                    <a target="_blank" href={`http://vk.com/share.php?url=${urlHref}`}><VKIcon /></a>
                    <a onClick={URLCopier} ><ShareLinkIcon /></a>
                </div>

                {tooltipIsOpen ? <Tooltip label="Скопировано" /> : null}
            </div>
        </div>
    );
};

export default VacancySidebar;
