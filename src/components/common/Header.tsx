import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface Link {
  name: string;
  url: string;
  active: boolean;
}
interface Profile {
  name: string;
  email: string;
  profilePicture: string;
}
interface HeaderProps {
  links: Link[];
  showTopBanner?: boolean;
  topBannerText?: string;
  logo?: string | JSX.Element;
  headerRef?: React.RefObject<HTMLDivElement>;
  showProfile?: boolean;
  profile?: Profile;
}
export default function Header({
  links,
  showTopBanner,
  topBannerText,
  logo,
  headerRef,
  showProfile,
  profile,
}: HeaderProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("user");
  };
  return (
    <div
      ref={headerRef}
      className="w-full bg-white shadow-md fixed top-0 z-50 mb-28"
    >
      {showTopBanner && (
        <div className="w-full p-1 bg-black text-white text-center text-lg font-semibold">
          {topBannerText}
        </div>
      )}

      <div className="w-full h-full p-3 max-w-7xl mx-auto flex items-center justify-between">
        {logo && <div className="text-2xl font-bold">{logo}</div>}
        {showProfile && (
          <div className="w-fit  flex flex-col items-center justify-between">
            <div className="flex gap-x-5 items-center justify-center">
              <Menu>
                <MenuHandler>
                  <img
                    src={profile?.profilePicture}
                    alt="profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                </MenuHandler>
                <MenuList
                  className="m-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <MenuItem
                    onClick={handleLogout}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
              <div>
                <div className="text-lg font-light">{profile?.name}</div>
                <div className="text-xs font-light">{profile?.email}</div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center">
          {links.map((link) => (
            <div
              className={`text-lg font-light mr-4 cursor-pointer ${
                link.active ? "border-b-2 border-black" : "border-none"
              }`}
              onClick={() => navigate(link.url)}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
