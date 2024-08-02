import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

type TInputProps = {
    type: string;
    name: string;
    placeholder?: string;
    label?: string;
}


const RHInput = ({ type, name, placeholder, label }: TInputProps) => {
    return (
        <div>
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
                        placeholder={placeholder}
                    />
                }
            />
        </div>
    );
};

export default RHInput;