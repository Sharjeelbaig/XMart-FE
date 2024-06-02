import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  PRODUCT_ID: number;
  USER_ID: number;
  CATEGORY_ID: number;
  NAME: string;
  DESCRIPTION: string;
  PRICE: number;
  COVER_IMAGE: string;
  IMAGE: string;
  CREATED_AT: string;
}

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
  PRODUCT_ID: number;
}

interface ChatListLayoutProps {
  products: Product[];
  receivedMessages: Message[];
  sentMessages: Message[];
}

export default function ChatListLayout({
  products,
  receivedMessages,
  sentMessages,
}: ChatListLayoutProps) {
  const [cover, setCover] = useState("");
  const navigate = useNavigate();

  const handleMouseEnter = useCallback((coverImage: string) => {
    setCover(coverImage);
  }, []);

  const handleItemClick = useCallback(
    (email: string) => {
      navigate(`/chat/${email}`);
    },
    [navigate]
  );

  const groupedReceivedMessages = useMemo(() => {
    const chatMap: { [key: string]: Message[] } = {};
    receivedMessages.forEach((message) => {
      if (!chatMap[message.SENDER_EMAIL]) {
        chatMap[message.SENDER_EMAIL] = [];
      }
      chatMap[message.SENDER_EMAIL].push(message);
    });
    return Object.entries(chatMap);
  }, [receivedMessages]);

  const groupedSentMessages = useMemo(() => {
    const chatMap: { [key: string]: Message[] } = {};
    sentMessages.forEach((message) => {
      if (!chatMap[message.PRODUCT_OWNER_EMAIL]) {
        chatMap[message.PRODUCT_OWNER_EMAIL] = [];
      }
      chatMap[message.PRODUCT_OWNER_EMAIL].push(message);
    });
    return Object.entries(chatMap);
  }, [sentMessages]);

  return (
    <div className="flex p-1 gap-2 h-full">
      <Card
        className="lg:w-[30%] w-[100%] m-auto sm:m-0 overflow-auto"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <List
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Products Chat
          </Typography>
          <hr className="h-1" />
          {products?.length > 0 ? (
            products.map((product) => (
              <ListItem
                key={product?.PRODUCT_ID}
                onPointerEnter={() => handleMouseEnter(product?.COVER_IMAGE)}
                onClick={() => handleItemClick(product?.PRODUCT_ID.toString())}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Avatar
                    variant="circular"
                    alt={product?.NAME}
                    src={product?.IMAGE}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </ListItemPrefix>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {product?.NAME}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {product?.DESCRIPTION}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    ${product?.PRICE}
                  </Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              You Haven't listed any product for sale
            </Typography>
          )}
        </List>

        <List
          className="mt-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Received Messages from buyers
          </Typography>
          <hr className="h-1" />
          {groupedReceivedMessages?.length > 0 ? (
            groupedReceivedMessages.map(([email, msgs]) => (
              <ListItem
                key={email}
                onClick={() => handleItemClick(msgs[0]?.PRODUCT_ID.toString())}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Avatar
                    variant="circular"
                    alt={msgs[0]?.SENDER_NAME}
                    src={msgs[0]?.SENDER_PROFILE_IMAGE}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </ListItemPrefix>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {msgs[0]?.SENDER_NAME}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {msgs[0]?.SENDER_EMAIL}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {new Date(msgs[0]?.CREATED_AT).toLocaleString()}
                  </Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              No received messages from buyers
            </Typography>
          )}
        </List>

        <List
          className="mt-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Sent Messages
          </Typography>
          <hr className="h-1" />
          {groupedSentMessages?.length > 0 ? (
            groupedSentMessages.map(([email, msgs]) => (
              <ListItem
                key={email}
                onClick={() => handleItemClick(msgs[0]?.PRODUCT_ID.toString())}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Avatar
                    variant="circular"
                    alt={msgs[0]?.PRODUCT_OWNER_NAME}
                    src={msgs[0]?.PRODUCT_OWNER_PROFILE_IMAGE}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </ListItemPrefix>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {msgs[0]?.PRODUCT_OWNER_NAME}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {msgs[0]?.PRODUCT_OWNER_EMAIL}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {new Date(msgs[0]?.CREATED_AT).toLocaleString()}
                  </Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              No sent messages
            </Typography>
          )}
        </List>
      </Card>

      <div className="w-[100%] h-[100%] relative lg:flex hidden rounded-2xl items-center justify-center">
        <img
          className="w-[100%] object-contain rounded-2xl"
          src={cover || "/X Mart.png"}
          alt="cover"
        />
      </div>
    </div>
  );
}
