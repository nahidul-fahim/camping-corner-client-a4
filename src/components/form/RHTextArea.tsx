/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type TTextAreaProps = {
    name: string;
    placeholder: string;
    label: string;
    className?: string;
    defaultValue?: any;
}

const RHTextArea = ({ name, placeholder, label, className, defaultValue }: TTextAreaProps) => {

    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label ? <label>{label}</label> : null}
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <Textarea
                        {...field}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        className={`${className} bg-offWhite/30`}
                    />
                }
            />
        </div>
    );
};

export default RHTextArea;