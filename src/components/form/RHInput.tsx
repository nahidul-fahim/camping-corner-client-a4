import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type TInputProps = {
    type: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    minValue?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RHInput = ({ type, name, placeholder, label, className, minValue, onChange }: TInputProps) => {

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
                        placeholder={placeholder}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        className={`${className} bg-white`}
                    />
                }
            />
        </div>
    );
};

export default RHInput;