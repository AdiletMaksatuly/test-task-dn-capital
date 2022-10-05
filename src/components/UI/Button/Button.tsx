import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/colors'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    contained?: boolean;
    outlined?: boolean;
    primary?: boolean;
    danger?: boolean;

    children: string
}

const getBackgroundColor = (props: ButtonProps) => {
    if (props.primary && props.contained) return colors.purple;
    if (props.danger && props.contained) return colors.red;

    return 'transparent';
}

const getBorderStyles = (props: ButtonProps) => {
    let borderStyles = 'none';

    if (props.outlined) {
        borderStyles = '1px solid';

        if (props.primary) return borderStyles += colors.purple;
        if (props.danger) return borderStyles += colors.red;
    }

    return borderStyles;
};

const getFontColor = (props: ButtonProps) => {
    if (props.primary && props.outlined) return colors.purple;
    if (props.primary && props.contained) return colors.white;

    if (props.danger && props.outlined) return colors.red;
    if (props.danger && props.contained) return colors.white;

    return colors.white
};

const StyledButton = styled.button`
  padding: 10px 23px;
  background-color: ${(props: ButtonProps) => getBackgroundColor(props)};
  color: ${(props: ButtonProps) => getFontColor(props)};
  border: ${(props: ButtonProps) => getBorderStyles(props)};
  border-radius: 5px;
  line-height: 17px;
  font-weight: 500;
`

function Button({ children, ...props }: ButtonProps) {
    return (
        <StyledButton {...props}>{children}</StyledButton>
    );
}

export default Button;