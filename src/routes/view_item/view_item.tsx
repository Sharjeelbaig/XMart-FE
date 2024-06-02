import { useParams } from "react-router-dom";
import ViewItemLayout from "../../layouts/ViewItemLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/common/loader";

export default function ViewItem() {
  const [item, setItem] = useState(null as any);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3000/get/product/${id}`).then((res) => {
      const item = res.data;
      setItem(item[0]);
    });
    console.log("item: ", item);
  }, []);

  return item ? (
    <ViewItemLayout
      coverImage={item.COVER_IMAGE}
      image={item.IMAGE}
      name={item.NAME}
      description={item.DESCRIPTION}
      price={item.PRICE}
      productId={item.PRODUCT_ID}
    />
  ) : (
    <Loader />
  );
}
