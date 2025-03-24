import React from "react";

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement>{
    value: string
    label: string
}

export const Option: React.FC<OptionProps> = ({value, label}) => {
    return (<option label={label} value={value}/>);
};
