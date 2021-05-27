import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './loader.css';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG,
    stopColor?: string
}

export const IconLoader = (props: IProps) => {
    const cn = useClassnames(style, props.svg?.className, true);

    const svgProps = {
        ...props.svg,
        className: cn('svg-icon_loader')
    };

    return (
        <SVG {...svgProps} viewBox="0 0 100 100">
            <circle fill="transparent" cx="50" cy="50" r="35" />
            <linearGradient>
                <stop offset="25%" stopColor={props.stopColor} stopOpacity="1" />
                <stop offset="50%" stopColor={props.stopColor} stopOpacity=".5" />
                <stop offset="100%" stopColor={props.stopColor} stopOpacity="0" />
            </linearGradient>
        </SVG>
    );
};

IconLoader.defaultProps = {
    stopColor: '#dadada'
};

export default IconLoader;
