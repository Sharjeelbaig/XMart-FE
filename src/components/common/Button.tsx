import { Button as MButton } from "@material-tailwind/react";

interface ButtonProps {
  text?: string;
  severity?: "primary" | "secondary" | "none";
  fullWidth?: boolean;
  onClick?: () => void;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  text,
  severity,
  fullWidth,
  onClick,
  icon,
  children,
  className,
}: ButtonProps) {
  const primary = "bg-black text-white hover:bg-white hover:text-black";
  const secondary = "bg-white text-black hover:bg-black hover:text-white";
  return (
    <MButton
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      fullWidth={fullWidth}
      onClick={onClick}
      className={
        !className
          ? `rounded-md  transition hover:scale-95 ${
              severity === "primary"
                ? primary
                : severity === "secondary"
                ? secondary
                : ""
            } duration-300 ease-in-out`
          : className
      }
    >
      {children ? (
        <div>{children}</div>
      ) : (
        <>
          <i className={icon}></i>
          {text}
        </>
      )}
    </MButton>
  );
}
