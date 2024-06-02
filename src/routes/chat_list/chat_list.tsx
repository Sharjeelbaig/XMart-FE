import axios from "axios";
import { useEffect, useState } from "react";
import ChatListLayout from "../../layouts/ChatListLayout";
import Loader from "../../components/common/loader";

export default function ChatList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([] as any);
  const [recievedMessages, setRecievedMessages] = useState([] as any);
  const [sentMessages, setSentMessages] = useState([] as any);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/get/myproducts/${user.USER_ID}`)
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchRecievedMessages = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/get/myMessages/${user.USER_ID}`)
      .then((res) => {
        setRecievedMessages(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchSentMessages = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/get/sentMessages/${user.USER_ID}`)
      .then((res) => {
        setSentMessages(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
    fetchRecievedMessages();
    fetchSentMessages();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ChatListLayout
      sentMessages={sentMessages}
      receivedMessages={recievedMessages}
      products={products}
    />
  );
}
