import { useEffect, useState } from "react";
import ItemsLayout from "../../layouts/ItemsLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Items() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const getAllMyItems = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("user") || "{}").USER_ID;
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/GET/myProducts/${id}`
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      return "Failed to fetch items" + error;
    }
  };
  useEffect(() => {
    getAllMyItems();
  }, []);
  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleEdit = (id: string) => {
    navigate(`/edit-item/${id}`);
  };

  const handleDelete = (id: string) => {
    confirm("Are you sure you want to delete this item?") &&
      axios.delete(`http://localhost:3000/DELETE/product/${id}`).then((res) => {
        console.log(res);
        console.log(res.data);
        getAllMyItems();
      });
  };
  const handleAddItem = () => {
    navigate("/add-item");
  };
  return (
    <ItemsLayout>
      <div className="grid grid-cols-3 gap-11 w-full ">
        <Button className=" w-64 !h-96 bg-black" onClick={handleAddItem}>
          <Card className="!bg-black flex flex-col justify-center items-center cursor-pointer">
            <i className="fa fa-plus-circle text-white text-4xl"></i>
          </Card>
        </Button>
        {items.map((item: any) => (
          <Card
            childrenContainerClassName="flex flex-col justify-between h-full items-center text-center"
            className=" w-64 !h-96 flex flex-col justify-between items-center text-center p-10"
            header={
              <img
                src={item.IMAGE}
                alt={item.NAME}
                className="w-30 h-20 m-auto"
              />
            }
          >
            <div className="flex flex-col w-full">
              <div className="text-lg font-semibold">{item.NAME}</div>
              <div className="text-sm font-light">{item.DESCRIPTION}</div>
              <div className="text-sm font-semibold">${item.PRICE}</div>
            </div>
            <div className="flex justify-between w-full gap-3">
              <Button
                onClick={() => handleEdit(item.PRODUCT_ID)}
                severity="primary"
                text="Edit"
              />
              <Button
                severity="secondary"
                text="Delete"
                onClick={() => handleDelete(item.PRODUCT_ID)}
              />
            </div>
          </Card>
        ))}
      </div>
    </ItemsLayout>
  );
}
