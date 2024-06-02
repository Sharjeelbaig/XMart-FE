import { useEffect, useState } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/loader";
import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import { Spinner } from "@material-tailwind/react";

export default function ChatScreen() {
  const [loading, setLoading] = useState(true);
  const [sendingLoading, setSendingLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null as any);
  const [productImage, setProductImage] = useState(null as any);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const productId = useParams().id;

  const fetchMessages = () => {
    axios.get(`http://localhost:3000/get/messages/${productId}`).then((res) => {
      setMessages(res.data);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/get/product/${productId}`).then((res) => {
      const item = res.data[0];
      setProductImage(item.IMAGE);
    });
  }, []);

  useEffect(() => {
    if (messages && productImage) setLoading(false);
  }, [messages, productImage]);

  const handleSendMessage = () => {
    setSendingLoading(true);
    setMessage("");
    axios
      .post(`http://localhost:3000/post/message/`, {
        sender_id: user.USER_ID,
        product_id: productId,
        message: message,
      })
      .then(() => {
        setMessage("");
        fetchMessages();
      })
      .finally(() => {
        setSendingLoading(false);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <ChatLayout
        productImage={productImage}
        messages={messages}
        inputMessageComponent={
          <>
            <TextInput
              id="send-message"
              placeholder="Enter your message"
              label="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage} text="Send" />
          </>
        }
      />
      {sendingLoading && (
        <div className="h-full absolute bottom-0 w-full flex items-center justify-center">
          <Spinner
            color={undefined}
            style={{ width: "50px", height: "50px" }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      )}
    </>
  );
}
