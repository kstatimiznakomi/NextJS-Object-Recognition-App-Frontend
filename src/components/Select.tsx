import {Option, OptionProps} from "@/components/Option";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<string> {
    name?: string
    options?: OptionProps[]
    id?: string
    className?: string
    onChange: ((event) => void) | undefined;
}

export const Select: React.FC<SelectProps> = ({onChange,className, name, options, id}) => {
    return (
        <select onChange={onChange} className={className} name={name} id={id}>
            {
                options?.map((option) => (
                    <Option key={option.value} label={option.label} value={option.value}/>
                ))
            }
        </select>
    );
};