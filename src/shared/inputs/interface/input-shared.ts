export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "url" | "date";
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  error?: string;
  className?: string;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}
