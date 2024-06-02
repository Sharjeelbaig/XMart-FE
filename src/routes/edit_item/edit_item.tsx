import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import { Select } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { getFile, uploadFile } from "../../configurations/firebase";
import EditItemLayout from "../../layouts/EditItemLayout";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/loader";

export default function EditItem() {
  const [loading, setLoading] = useState(true);
  const [coverImageSrc, setCoverImageSrc] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [formData, setFormData] = useState({
    sellerId: "",
    name: "",
    description: "",
    price: "",
    image: "",
    coverImage: "",
    category: "",
  } as any);
  const navigate = useNavigate();
  const productId = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:3000/get/product/${productId}`).then((res) => {
      const item = res.data[0];
      setFormData({
        name: item.NAME,
        description: item.DESCRIPTION,
        price: item.PRICE,
        image: item.IMAGE,
        coverImage: item.COVER_IMAGE,
        category: item.CATEGORY_ID,
      });
      setCoverImageSrc(item.COVER_IMAGE);
      setImageSrc(item.IMAGE);
      setCategoryName(item.CATEGORY_ID);
      setLoading(false);
    });
  }, []);

  const handleEditItem = async () => {
    setLoading(true);
    try {
      if (!formData.name || !formData.price) {
        throw new Error("Please fill out all required fields");
      }

      const image = await axios.get(imageSrc, { responseType: "blob" });
      const imageFile = new File([image.data], `${formData.name}.png`, {
        type: "image/png",
      });

      const coverImage = await axios.get(coverImageSrc, {
        responseType: "blob",
      });
      const coverImageFile = new File(
        [coverImage.data],
        `${formData.name}_cover.png`,
        { type: "image/png" }
      );

      await uploadFile(
        `products/${formData.sellerId}/${formData.name}/${formData.name}.png`,
        imageFile
      );

      await uploadFile(
        `products/${formData.sellerId}/${formData.name}/${formData.name}_cover.png`,
        coverImageFile
      );

      const imageUrl = await getFile(
        `products/${formData.sellerId}/${formData.name}/${formData.name}.png`
      );
      const coverImageUrl = await getFile(
        `products/${formData.sellerId}/${formData.name}/${formData.name}_cover.png`
      );
      console.log("object", {
        category_id: formData.category,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        cover_image: coverImageUrl,
        image: imageUrl,
      });
      const response = await axios.put(
        `http://localhost:3000/put/product/${productId}`,
        {
          category_id: formData.category,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          cover_image: coverImageUrl,
          image: imageUrl,
        }
      );

      if (response.status === 200) {
        toast("Item updated successfully");
        setLoading(false);
        navigate("/items");
      } else {
        setLoading(false);
        toast("Failed to update item");
      }
    } catch (error: any) {
      console.error("Error updating item", error);
      setLoading(false);
      toast("Failed to update item: " + error.message);
    }
  };

  const handleCategorySelect = (e: any) => {
    setFormData({ ...formData, category: e.currentTarget.value });
    setCategoryName(e.currentTarget.innerText);
  };

  return loading ? (
    <Loader />
  ) : (
    <EditItemLayout
      coverImageSrc={coverImageSrc}
      setCoverImageSrc={setCoverImageSrc}
      imageSrc={imageSrc}
      setImageSrc={setImageSrc}
    >
      <TextInput
        id="name"
        label="Name"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextInput
        id="description"
        label="Description"
        placeholder="Description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextInput
        id="price"
        label="Price"
        placeholder="Price"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <Select
        value={categoryName}
        label="Category"
        color="light-blue"
        placeholder="Category"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <option
          className="cursor-pointer"
          onClick={handleCategorySelect}
          value="1"
        >
          Electronics
        </option>
        <option
          className="cursor-pointer"
          onClick={handleCategorySelect}
          value="2"
        >
          Clothing
        </option>
        <option
          className="cursor-pointer"
          onClick={handleCategorySelect}
          value="3"
        >
          Books
        </option>
        <option
          className="cursor-pointer"
          onClick={handleCategorySelect}
          value="4"
        >
          Furniture
        </option>
        <option
          className="cursor-pointer"
          onClick={handleCategorySelect}
          value="5"
        >
          Others
        </option>
      </Select>
      <Button text="Update" onClick={handleEditItem} />
    </EditItemLayout>
  );
}
