import { Typography } from "@material-tailwind/react";

interface BigTextProps {
  varient: "primary" | "secondary";
  text: string;
}
export default function BigText({ varient, text }: BigTextProps) {
  const primary = "text-gray-900";
  const secondary = "text-black";
  return (
    <Typography
      color="gray"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className={`text-4xl font-bold ${
        varient === "primary" ? primary : secondary
      }`}
    >
      {text}
    </Typography>
  );
}
