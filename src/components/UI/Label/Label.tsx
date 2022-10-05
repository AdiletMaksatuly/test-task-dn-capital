import React from 'react';
import classes from './Label.module.css'

interface LabelProps {
    text?: string;
    children: React.ReactNode;
}

const { label } = classes;

function Label({ text, children }: LabelProps) {
    return (
        <label>
            {text && <span className={label}>{text}</span>}
            {children}
        </label>
    );
}

export default Label;