interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  transparent?: boolean;
  className?: string;
  responsiveWidth?: boolean;
  childrenContainerClassName?: string;
}
export default function Card({
  children,
  header,
  footer,
  fullWidth,
  fullHeight,
  transparent,
  className,
  responsiveWidth,
  childrenContainerClassName,
}: CardProps) {
  return (
    <div
      className={`
         ${transparent ? "bg-transparent" : "bg-white shadow-2xl"}
          rounded-2xl p-1 ${fullWidth && "sm:w-full"}  
      ${fullHeight ? "sm:h-full" : "sm:h-fit"} ${
        responsiveWidth && "w-full"
      } ${className}
      *:m-3 `}
      style={{
        color: "unset",
      }}
    >
      <div>{header}</div>
      <div className={childrenContainerClassName}>{children}</div>
      <div>{footer}</div>
    </div>
  );
}
