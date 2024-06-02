import { Input } from "@material-tailwind/react";

interface TextInputProps {
  id: string;
  ariaDescribedby?: string;
  onPointerEnterCapture?: any;
  onPointerLeaveCapture?: any;
  crossOrigin?: any;
  placeholder: string;
  label: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  varient?: "outlined" | "standard";
}
export default function TextInput({
  id,
  ariaDescribedby,
  onPointerEnterCapture,
  onPointerLeaveCapture,
  crossOrigin,
  placeholder,
  label,
  type,
  varient,
  onChange,
}: TextInputProps) {
  return (
    <Input
      id={id}
      onChange={onChange}
      label={label}
      variant={varient || "outlined"}
      aria-describedby={ariaDescribedby || undefined}
      onPointerEnterCapture={onPointerEnterCapture || undefined}
      onPointerLeaveCapture={onPointerLeaveCapture || undefined}
      crossOrigin={crossOrigin || undefined}
      placeholder={placeholder}
      className="hover:scale-[1.006] focus:scale-100"
      type={type || "text"}
    />
  );
}
