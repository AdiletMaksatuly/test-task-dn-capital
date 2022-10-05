import React from 'react';
import classes from './Title.module.css';

const { h1 } = classes;

interface TitleProps {
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    style?: React.CSSProperties;
    children: string
}

function Title({ size, style, children }: TitleProps) {
    if (size === 'h2') {
        return (
            <h2 style={style}>{children}</h2>
        );
    }

    if (size === 'h3') {
        return (
            <h3 style={style}>{children}</h3>
        );
    }

    if (size === 'h4') {
        return (
            <h4 style={style}>{children}</h4>
        );
    }

    if (size === 'h5') {
        return (
            <h5 style={style}>{children}</h5>
        );
    }

    if (size === 'h6') {
        return (
            <h6 style={style}>{children}</h6>
        );
    }
    return (
        <h1 className={h1} style={style}>{children}</h1>
    );
}

export default Title;