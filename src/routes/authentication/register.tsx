import Authlayout from "../../layouts/AuthLayout";
import BigText from "../../components/common/BigText";
import Card from "../../components/common/Card";
import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-tailwind/react";
import { setUser } from "../../storage/user/userSlice";
import { useNavigate } from "react-router-dom";
import { ImagePickerConf } from "react-image-picker-editor";
import { useState } from "react";
import { getFile, uploadFile } from "../../configurations/firebase";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/common/loader";
import ImageUploader from "../../components/common/ImageUploader";

export default function Register() {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  } as any);
  const navigate = useNavigate();

  const validateForm = () => {
    if (formData.name === "") {
      toast("Name is required");
      return false;
    }
    if (formData.email === "") {
      toast("Email is required");
      return false;
    }
    if (formData.password === "") {
      toast("Password is required");
      return false;
    }
    if (formData.confirmPassword === "") {
      toast("Confirm Password is required");
      return false;
    }
    if (formData.dateOfBirth === "") {
      toast("Date of Birth is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast("Password and Confirm Password do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    const imageUrl = imageSrc ? imageSrc : "/avatar.png";
    setLoading(true);
    try {
      const response = await axios.get(imageUrl, { responseType: "blob" });
      const blob = response.data;
      const file = new File([blob], "profilepic.png", { type: "image/png" });

      const uploadUrl = `user/${formData.email}/profilepic.png`;
      await uploadFile(uploadUrl, file);

      const url = await getFile(uploadUrl);

      await axios.post(
        "http://localhost:3000/post/user/",
        {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          profile_image: url,
          date_of_birth: moment(formData.dateOfBirth).format("YYYY-MM-DD"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUser({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
      });
      const user = await axios.get(
        `http://localhost:3000/get/user/${formData.email}`
      );
      localStorage.setItem("user", JSON.stringify(user.data[0]));
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const imageConfig: ImagePickerConf = {
    borderRadius: "1px",
    language: "en",
    width: "100px",
    height: "100px",
    objectFit: "revert",
    aspectRatio: 4,
    compressInitial: null,
  };

  return (
    <Authlayout>
      {loading && <Loader />}
      <div className="sm:w-1/2 m-auto flex sm:flex-row flex-col">
        <Card
          transparent
          fullWidth
          header={
            <div className="flex w-fit items-center">
              <Typography
                className="text-[2rem] m-auto animate-pulse"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                🔒
              </Typography>
              <div className="">
                <BigText varient="primary" text="Sign Up" />
              </div>
            </div>
          }
        >
          <ImageUploader
            width="100px"
            height="100px"
            containerClassName="w-24 h-24 m-auto rounded-lg"
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            config={imageConfig}
            id="profilePic"
          />

          <div className="flex flex-col w-full *:mt-2 ">
            <TextInput
              id="name"
              label="Name"
              placeholder="Enter your name"
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
            <TextInput
              id="email"
              label="Email"
              placeholder="Enter your email address"
              type="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <div className="flex lg:flex-row flex-col w-full gap-1 *:mt-2 *:lg:mt-0">
              <TextInput
                id="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <TextInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                }}
              />
            </div>
            <DatePicker
              customInput={
                <TextInput
                  id="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Enter your date of birth"
                  type="date"
                />
              }
              onChange={(date) => {
                setFormData({ ...formData, dateOfBirth: date });
              }}
            />

            <Checkbox
              label="Remember me"
              onChange={() => console.log("Remember me")}
            />
            <Button
              fullWidth
              severity="primary"
              text="Sign In"
              onClick={handleSignup}
            />
            <Typography
              className="text-center text-gray-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Login
              </a>
            </Typography>
          </div>
        </Card>
      </div>
    </Authlayout>
  );
}
