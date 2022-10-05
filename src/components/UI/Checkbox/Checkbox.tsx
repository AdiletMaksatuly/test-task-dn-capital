import React, { ForwardedRef, forwardRef, MutableRefObject, useEffect, useMemo, useState } from 'react';
import classes from './Checkbox.module.css'
import IconChecked from "../Icon/IconChecked";
import { CreateFormFieldsProps } from "../../../models";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isSubmitSuccesful?: boolean;
}

const {
    'checkbox-container': checkboxContainer,
    input,
    checkbox,
    'checkbox-checked': checkboxChecked,
    'checkbox-label': checkboxLabel
} = classes;

const Checkbox = forwardRef(({
                                 checked,
                                 onChange,
                                 isSubmitSuccesful,
                                 label,
                                 name,
                                 register,
                                 rules,
                                 ...props
                             }: CheckboxProps & CreateFormFieldsProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    const checkboxClasses = useMemo(() => {
        return [checkbox, isChecked ? checkboxChecked : ''].join(' ');
    }, [isChecked]);

    const checkboxRegistered = register && name ? register(name, rules) : null;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checkboxRegistered) {
            checkboxRegistered.onChange(e);
        }

        if (onChange) {
            return onChange(e)
        }

        setIsChecked((prev) => {
            return !prev;
        });
    };

    useEffect(() => {
        if (!isSubmitSuccesful) return;

        setIsChecked(false)
    }, [isSubmitSuccesful])

    return (
        <label className={checkboxContainer}>
            {
                checkboxRegistered
                    ? <input
                        type="checkbox"
                        className={input}
                        {...checkboxRegistered}
                        checked={isChecked}
                        onChange={onChangeHandler}
                        ref={
                            (e) => {
                                checkboxRegistered.ref(e);
                                if (ref && e) {
                                    (ref as MutableRefObject<HTMLInputElement>).current = e;
                                }
                            }
                        }
                        {...props}
                    />
                    : <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onChangeHandler}
                        name={name}
                        className={input}
                        {...props}
                    />
            }

            <span className={checkboxClasses}>
                {
                    isChecked && <IconChecked style={{ color: '#fff' }}/>
                }
            </span>
            <span className={checkboxLabel}>{label}</span>
        </label>
    );
});

export default Checkbox;