type FormValidationErrorProps = {
    errors: string | string[];
};

export default function FormValidationError({ errors }: FormValidationErrorProps) {
    if (typeof errors === 'string') errors = [errors];

    return (
        <div className="text-red-500 text-xs">
            {errors.map((err) => (
                <div key={err}>{err}</div>
            ))}
        </div>
    );
}
