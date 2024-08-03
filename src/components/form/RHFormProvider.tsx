import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    className?: string;
}

const RHFormProvider = ({ onSubmit, children, className }: TFormProps) => {

    const methods = useForm();


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={className}>
                {children}
            </form>
        </FormProvider>
    );
};

export default RHFormProvider;