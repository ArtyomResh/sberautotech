import React, { SVGAttributes, ReactNode } from 'react';

export interface IProps extends SVGAttributes<SVGElement> {
    children?: ReactNode,
    className?: string
}

export const defaultProps = {
    xmlns  : 'http://www.w3.org/2000/svg',
    width  : 100,
    height : 100,
    viewBox: '0 0 32 32'
};

const SVG = (props: IProps) => <svg fillRule="evenodd" {...props} />;

SVG.defaultProps = defaultProps;

export default SVG;
