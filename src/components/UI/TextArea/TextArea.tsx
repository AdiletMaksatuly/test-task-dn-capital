import React from 'react';

import classes from './TextArea.module.css'
import Label from "../Label/Label";
import { CreateFormFieldsProps } from "../../../models";

const { textarea } = classes;

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

function TextArea({ name, label, register, rules, ...props }: TextAreaProps & CreateFormFieldsProps) {
    return (
        <Label text={label}>
            <textarea  {...((register && name) && register(name, rules))} className={textarea} name={name} {...props} />
        </Label>
    );
}

export default TextArea;