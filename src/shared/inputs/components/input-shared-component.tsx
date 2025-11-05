import type { InputProps } from "../interface/input-shared";

function InputSharedComponent({
    name,
    label,
    placeholder,
    type = "text",
    value,
    defaultValue,
    disabled,
    required,
    readOnly,
    autoFocus,
    max,
    maxLength,
    min,
    minLength,
    error,
    className = "",
    onChange,
    onBlur,
    onFocus,
}: InputProps) {
    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium">
                    {label}
                </label>
            )}

            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                autoFocus={autoFocus}
                max={max}
                maxLength={maxLength}
                min={min}
                minLength={minLength}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={onBlur}
                onFocus={onFocus}
                className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

export default InputSharedComponent;
