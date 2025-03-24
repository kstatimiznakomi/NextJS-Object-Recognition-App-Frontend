import React, {MouseEventHandler} from "react";

interface ButtonProps {
    className?: string
    text?: string
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button: React.FC<ButtonProps> = ({className, text, disabled, onClick}) => {
    return (<button onClick={onClick} disabled={disabled} className={className}>{text}</button>)
}