import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

type TInputProps = {
    type: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    minValue?: number;
}


const RHInput = ({ type, name, placeholder, label, className, minValue }: TInputProps) => {
    return (
        <div className="space-y-2">
            {label ?
                <label>{label}</label>
                :
                null
            }
            <Controller
                name={name}
                render={({ field }) =>
                    <Input
                        {...field}
                        type={type}
                        id={name}
                        min={minValue}
                        placeholder={placeholder}
                        className={`${className} bg-white`}
                    />
                }
            />
        </div>
    );
};

export default RHInput;