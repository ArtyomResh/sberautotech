import React, { useEffect, useState } from 'react';
import styles from './open-beta.css';
import { useClassnames } from '../../../hooks/use-classnames';
import GridWrapper from "../../public-beta-signup/components/grid-wrapper";

interface IProps {
    testingStartsAt: Date | string
}

const SIXTEE = 60;
const HOURS_IN_DAY = 24;
const MILLIS_IN_MINUTE = 1000 * SIXTEE;
const MILLIS_IN_HOUR = MILLIS_IN_MINUTE * SIXTEE;
const MILLIS_IN_DAY = MILLIS_IN_HOUR * HOURS_IN_DAY;

function formatTimeWithUnit(num: number, one: string, few: string, other: string) {
    const n = num < 20 ? num : num % 10;

    if(n === 1) {
        return <React.Fragment>{num}&nbsp;{one}</React.Fragment>;
    } else if(n > 1 && n <= 4) {
        return <React.Fragment>{num}&nbsp;{few}</React.Fragment>;
    }

    return <React.Fragment>{num}&nbsp;{other}</React.Fragment>;
}

const OpenTesting = ({ testingStartsAt }: IProps) => {
    const [[days, hours, minutes], setTimeLeft] = useState<[number, number, number]>([0, 0, 0]);
    const cn = useClassnames(styles);

    useEffect(
        () => {
            const id = setInterval(() => {
                const millisUntilStart = (testingStartsAt instanceof Date ? testingStartsAt : new Date(testingStartsAt)).getTime() - Date.now();
                const daysUntilStart = Math.floor(millisUntilStart / MILLIS_IN_DAY);
                const hoursUntilStart = Math.floor((millisUntilStart - daysUntilStart * MILLIS_IN_DAY) / MILLIS_IN_HOUR);
                const minutesUntilStart = Math.floor((millisUntilStart - daysUntilStart * MILLIS_IN_DAY - hoursUntilStart * MILLIS_IN_HOUR) / MILLIS_IN_MINUTE);

                setTimeLeft([daysUntilStart, hoursUntilStart, minutesUntilStart]);
            });

            return function cleanup() {
                clearInterval(id);
            };
        },
        [testingStartsAt]
    );

    return (
        <GridWrapper as="section">
            <div>
                <div className={cn('openBetaWrap')}>
                    <div className={cn('openBeta')}>
                        <p className={cn('title')}>Станьте первым пассажиром</p>
                        <h3 className={cn('header')}><strong>Открытое тестирование</strong> беспилотных технологий</h3>
                        <p className={cn('paragraph')}>
                            Прямо сейчас по Крылатскому ездят наши беспилотные автомобили. Уже совсем скоро они смогут
                            отвезти вас
                            по
                            делам!
                        </p>
                        <p className={cn('paragraph')}>
                            Давайте приближать будущее вместе! До начала бета-теста
                        </p>
                        <div className={cn('timer')}>
                            {formatTimeWithUnit(days, 'день', 'дня', 'дней')}{' '}
                            {formatTimeWithUnit(hours, 'час', 'часа', 'часов')}{' '}
                            {formatTimeWithUnit(minutes, 'минута', 'минуты', 'минут')}{' '}
                        </div>
                    </div>
                    <div className={cn('location')}>
                        <div className={cn('locationBlock')}>
                            <span className={cn('locationBlockLabel')}>
                                Локация
                            </span>
                            <h3 className={cn('locationBlockValue')}>
                                Крылатское
                            </h3>
                        </div>
                        <div className={cn('locationBlock')}>
                            <span className={cn('locationBlockLabel')}>
                                Протяженность маршрута
                            </span>
                            <h3 className={cn('locationBlockValue')}>
                                30 км
                            </h3>
                        </div>
                        <div className={cn('locationBlock')}>
                            <span className={cn('locationBlockLabel')}>
                                Машин на линии
                            </span>
                            <h3 className={cn('locationBlockValue')}>
                                10
                            </h3>
                        </div>
                    </div>
                    <div className={cn('map')}>
                        <div className={cn('mapOverlay')} />
                    </div>
                </div>
                <div className={cn('description')}>
                    <h3 className={cn('header')}>
                        С помощью беспилотного сервиса <strong>можно отправиться</strong>
                        в парк или в магазин, доехать до метро или забрать ребенка из школы
                    </h3>
                    <div className={cn('paragraph')}>
                        Мы выбрали самые популярные локации, чтобы вписать беспилотники в городскую среду и увидеть своими
                        глазами, каким будет завтрашний день обычного жителя мегаполиса.
                        <br />
                        <small>
                            Тестирование бесплатно и доступно для всех.
                        </small>
                    </div>
                    <div className={cn('signUpButtonWrap')}>
                        <a className={cn('signUpButton')} href="/public-beta-signup#modal">Принять участие</a>
                    </div>
                </div>
            </div>
        </GridWrapper>
    );
};

export default OpenTesting;
