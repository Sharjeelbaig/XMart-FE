import { useEffect, useRef, useState } from "react";

import Header from "../components/common/Header";

interface Message {
  MESSAGE_ID: number;
  MESSAGE: string;
  CREATED_AT: string;
  SENDER_NAME: string;
  SENDER_PROFILE_IMAGE: string;
  SENDER_EMAIL: string;
  PRODUCT_OWNER_NAME: string;
  PRODUCT_OWNER_PROFILE_IMAGE: string;
  PRODUCT_OWNER_EMAIL: string;
}

interface ChatLayoutProps {
  productImage: string;
  messages: Message[];
  inputMessageComponent: JSX.Element;
}

const ChatLayout = ({
  productImage,
  messages,
  inputMessageComponent,
}: ChatLayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="h-full flex flex-col w-full">
      <Header
        headerRef={headerRef}
        links={[]}
        logo={
          <img
            className="h-10 w-10 object-cover rounded-full "
            src={productImage}
            alt="Product"
          />
        }
      />
      <div
        className="flex-1 overflow-y-auto p-20"
        style={{ marginTop: headerHeight }}
      >
        {messages.map((message) => {
          const isMe = message?.SENDER_EMAIL === user?.EMAIL;
          return (
            <div
              key={message?.MESSAGE_ID}
              className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}
            >
              {!isMe && (
                <img
                  src={message?.SENDER_PROFILE_IMAGE}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}
              <div
                className={`p-4 rounded-lg shadow-md ${
                  isMe ? "bg-black text-white" : "bg-white border text-black"
                }`}
              >
                <p className="font-semibold">
                  {message?.SENDER_NAME} {isMe ? "(ME)" : ""}
                </p>
                <p>{message?.MESSAGE}</p>
              </div>
              {isMe && (
                <img
                  src={message?.SENDER_PROFILE_IMAGE}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ml-2"
                />
              )}
            </div>
          );
        })}
      </div>
      <hr className="border-t-2 border-black" />
      <div className="flex justify-center p-4 gap-5">
        {inputMessageComponent}
      </div>
    </div>
  );
};

export default ChatLayout;
