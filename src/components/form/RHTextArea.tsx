import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type TTextAreaProps = {
    name: string;
    placeholder: string;
    label: string;
    className?: string;
}

const RHTextArea = ({ name, placeholder, label, className }: TTextAreaProps) => {

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
                        className={`${className} bg-white`}
                    />
                }
            />
        </div>
    );
};

export default RHTextArea;