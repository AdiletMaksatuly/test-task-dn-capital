import React from 'react';
import classes from './Badge.module.css'

interface BadgeProps {
    title: string;
    color: string;
}

function Badge({ title, color }: BadgeProps) {
    return (
        <span className={classes.tag} style={{ color: color, backgroundColor: `${color}1F` }}>{title}</span>
    );
}

export default Badge;