import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import { RootState } from "../storage/store";
import { useEffect, useRef, useState } from "react";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = useSelector((state: RootState) => state.user);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);
  const links = [
    {
      name: "Home",
      url: "/",
      active: false,
    },
    {
      name: "Items",
      url: "/items",
      active: true,
    },
    {
      name: "Chats",
      url: "/chat-list",
      active: false,
    },
  ];
  useEffect(() => {
    document.getElementById("root")?.style.setProperty("overflow", "auto");
  }, []);
  return (
    <div className="h-full">
      <Header
        headerRef={headerRef}
        showProfile
        profile={profile}
        links={links}
      />
      <div
        className="*:mt-5 w-full flex justify-center flex-col max-w-3xl mx-auto sm:p-0 p-5 h-full"
        style={{ marginTop: headerHeight }}
      >
        <div className="flex gap-5 flex-wrap m-auto justify-around  h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
