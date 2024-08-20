/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type TInputProps = {
    type: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    defaultValue?: any;
    step?: number;
    minValue?: number;
    maxValue?: number;
    required?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RHInput = ({ type, name, placeholder, label, className, defaultValue, step, minValue, maxValue, required = true, onChange }: TInputProps) => {

    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label ? <label>{label}</label> : null}
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <Input
                        {...field}
                        type={type}
                        id={name}
                        min={minValue}
                        max={maxValue}
                        step={step ? step : ".01"}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        required={required}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        className={`${className} bg-offWhite/30`}
                    />
                }
            />
        </div>
    );
};

export default RHInput;