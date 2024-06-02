import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";

interface ViewItemLayoutProps {
  coverImage: string;
  image: string;
  name: string;
  description: string;
  price: string;
  productId: string;
}
export default function ViewItemLayout({
  coverImage,
  image,
  name,
  description,
  price,
  productId,
}: ViewItemLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);

  const handleMessageSeller = () => {
    navigate(`/chat/${productId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Header
        headerRef={headerRef}
        showTopBanner
        logo="🛒 XMart"
        topBannerText="get 50% discount on this product 🎉"
        links={[]}
        showProfile={false}
      />
      <div
        className="flex sm:flex-row flex-col items-center justify-center h-full w-full"
        style={{ marginTop: headerHeight }}
      >
        <img
          className="sm:w-1/2 w-full h-full object-cover"
          src={coverImage}
          alt="item"
        />
        <div className="sm:w-1/2 w-full h-full flex flex-col items-center justify-center gap-6">
          <div className="h-32 rounded-lg bg-black p-1">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="item"
            />
          </div>
          <div className="text-4xl font-semibold">{name}</div>
          <div className="text-lg font-light">{description}</div>
          <div className="text-2xl font-semibold">${price}</div>
          <button
            onClick={handleMessageSeller}
            className="bg-black text-white p-2 rounded-lg mt-5"
          >
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
}
