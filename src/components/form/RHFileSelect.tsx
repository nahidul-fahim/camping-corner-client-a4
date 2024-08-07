import { useFormContext, Controller } from 'react-hook-form';

type TSelectFieldProps = {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const RHFileSelect = ({ name, placeholder, label, className, onChange }: TSelectFieldProps) => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label ? <label htmlFor={name}>{label}</label> : null}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange: fieldOnChange, ...rest } }) => (
                    <input
                        type="file"
                        id={name}
                        accept="image/*"
                        placeholder={placeholder}
                        onChange={(e) => {
                            fieldOnChange(e);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        className={`${className} bg-white`}
                        {...rest}
                    />
                )}
            />
        </div>
    );
};

export default RHFileSelect;
