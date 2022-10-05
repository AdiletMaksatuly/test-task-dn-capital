import React, { ForwardedRef, forwardRef, MutableRefObject, ReactNode } from 'react';
import classes from './Input.module.css'
import Label from "../Label/Label";
import { CreateFormFieldsProps } from "../../../models";

const { input, 'input-icon': inputIcon } = classes;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
}

const Input = forwardRef(({
                              label,
                              icon,
                              value,
                              type,
                              onClick,
                              name,
                              register,
                              rules,
                              ...props
                          }: CreateFormFieldsProps & InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const inputRegistered = register && name ? register(name, rules) : '';

    return (
        <Label text={label}>
            {
                inputRegistered
                    ?
                    <input
                        type={'text'}
                        value={value}
                        onClick={onClick}
                        className={input}
                        {...inputRegistered}
                        ref={(e) => {
                            inputRegistered.ref(e);
                            if (ref) {
                                if (e) {
                                    (ref as MutableRefObject<HTMLInputElement>).current = e;
                                }
                            }
                        }}
                        {...props}
                    />
                    : <input
                        type={'text'}
                        value={value}
                        onClick={onClick}
                        className={input}
                        ref={ref}
                        {...props}
                    />
            }

            <div className={inputIcon}>
                {icon}
            </div>
        </Label>
    );
});


// const Input = ({label, icon, value, type, onClick, name, register, rules, ...props}: CreateFormFieldsProps & InputProps) => {
//     return (
//         <Label text={label}>
//             <input
//                 type={'text'}
//                 name={name}
//                 value={value}
//                 onClick={onClick}
//                 className={input}
//                 {...((register && name) && register(name, rules))}
//                 {...props}/>
//             <div className={inputIcon}>
//                 {icon}
//             </div>
//         </Label>
//     )
// };

export default Input;