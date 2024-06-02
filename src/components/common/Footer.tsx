import { Typography, Input, IconButton } from "@material-tailwind/react";
import Button from "./Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const currentYear = new Date().getFullYear();

interface footerProps {
  footerRef?: React.RefObject<HTMLDivElement>;
  collapsed?: boolean;
  handleCollapse?: () => void;
  links?: { sectionName: string; subLinks: { title: string; url: string }[] }[];
}
export default function Footer({
  footerRef,
  collapsed,
  handleCollapse,
  links,
}: footerProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (footerRef?.current) {
      if (collapsed) {
        footerRef.current.style.height = "0";
      } else {
        footerRef.current.style.transform = "scaleY(1)";
        footerRef.current.style.height = "auto";
      }
    }
  }, [collapsed]);

  return (
    <>
      <div className="-translate-y-10">
        <IconButton
          color="white"
          ripple
          placeholder={undefined}
          onClick={handleCollapse}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className={` absolute rounded-full bg-black text-white animate-bounce z-10`}
        >
          {/* <i className="fa fa-chevron-down " /> */}
          {collapsed ? (
            <i className="fa fa-chevron-up" />
          ) : (
            <i className="fa fa-chevron-down" />
          )}
        </IconButton>
      </div>
      <footer
        ref={footerRef}
        className="w-full transition bg-black text-white h-auto fixed bottom-0"
      >
        <div
          className={`p-2 flex relative lg:flex-row flex-col grid-cols-3  justify-between max-w-7xl m-auto items-center`}
        >
          {/* subscription section */}
          <div className="w-full lg:w-auto flex flex-col *:m-1">
            <Typography
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
              color="white"
              className="text-2xl font-semibold"
            >
              Subscribe 📰
            </Typography>

            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder="Enter email address"
              label="Email"
              color="white"
              crossOrigin={undefined}
            />

            <Button fullWidth text="Subscribe" severity="secondary" />
          </div>
          {/* links */}
          <div className="flex flex-wrap *:m-1">
            {links?.map((link) => (
              <div className="flex flex-col *:m-1 items-start h-full">
                <Typography
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                  color="white"
                  className="text-lg font-semibold"
                >
                  {link.sectionName}
                </Typography>
                {link?.subLinks?.map((link) => (
                  <Typography
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    placeholder={undefined}
                    color="white"
                    className="text-xs font-light hover:animate-pulse cursor-pointer"
                    onClick={() => navigate(link.url)}
                  >
                    {link.title}
                  </Typography>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* copyright */}
        <div className="w-full border-t-[0.1px] max-w-7xl m-auto bg-black text-white text-center p-2">
          <Typography
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
            color="white"
            className="text-xs font-light"
          >
            &copy; {currentYear} All rights reserved
          </Typography>
        </div>
      </footer>
    </>
  );
}
