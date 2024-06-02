import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import AddItemLayout from "../../layouts/AddItemLayout";
import { Select } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { getFile, uploadFile } from "../../configurations/firebase";

export default function AddItem() {
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.USER_ID) {
          setFormData((prevData: any) => ({
            ...prevData,
            sellerId: parsedUser.USER_ID,
          }));
        } else {
          throw new Error("USER_ID is missing in localStorage data");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleAddItem = async () => {
    try {
      if (!formData.sellerId || !formData.name || !formData.price) {
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

      const response = await axios.post("http://localhost:3000/post/product", {
        user_id: formData.sellerId,
        category_id: formData.category,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        cover_image: coverImageUrl,
        image: imageUrl,
      });

      if (response.status === 200) {
        toast("Item added successfully");
      } else {
        toast("Failed to add item");
      }
    } catch (error: any) {
      console.error("Error adding item", error);
      toast("Failed to add item: " + error.message);
    }
  };

  const handleCategorySelect = (e: any) => {
    setFormData({ ...formData, category: e.currentTarget.value });
    setCategoryName(e.currentTarget.innerText);
  };

  return (
    <AddItemLayout
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
      <Button text="Add Item" onClick={handleAddItem} />
    </AddItemLayout>
  );
}
