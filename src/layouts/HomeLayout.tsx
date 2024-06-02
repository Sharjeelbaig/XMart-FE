import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../storage/store";

import { setAllItems } from "../storage/items/itemsSlice";
import axios from "axios";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = useSelector((state: RootState) => state.user);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("root")?.style.setProperty("overflow", "auto");
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/get/products").then((res) => {
      const items = res.data.map((item: any) => {
        return {
          id: item.PRODUCT_ID,
          name: item.NAME,
          description: item.DESCRIPTION,
          price: item.PRICE,
          user_id: item.USER_ID,
          category_id: item.CATEGORY_ID,
          cover_image: item.COVER_IMAGE,
          image: item.IMAGE,
          created_at: item.CREATED_AT,
        };
      });
      dispatch(setAllItems(items));
    });
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);

  const links = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Items",
      url: "/items",
      active: false,
    },
    {
      name: "chat",
      url: "/chat-list",
      active: false,
    },
  ];

  return (
    <div>
      <Header
        headerRef={headerRef}
        showProfile
        profile={profile}
        links={links}
      />
      <div
        className="*:mt-5 w-full flex justify-center flex-col max-w-3xl mx-auto sm:p-0 p-5"
        style={{ marginTop: headerHeight }}
      >
        {children}
      </div>
    </div>
  );
}
