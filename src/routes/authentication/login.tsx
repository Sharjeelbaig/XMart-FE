import Authlayout from "../../layouts/AuthLayout";
import BigText from "../../components/common/BigText";
import Card from "../../components/common/Card";
import TextInput from "../../components/common/TextInput";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import { Typography } from "@material-tailwind/react";
import { setUser } from "../../storage/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../storage/store";
import { toast } from "react-toastify";
import Loader from "../../components/common/loader";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (profile.name) {
      navigate("/home");
    }
  }, [profile]);

  const validateForm = () => {
    if (formData.email === "") {
      toast("Email is required");
      return false;
    }
    if (formData.password === "") {
      toast("Password is required");
      return false;
    }
    return true;
  };

  const handleSignin = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    const user = await axios.get(
      `http://localhost:3000/get/user/${formData.email}`
    );
    if (!user.data.length) {
      setLoading(false);
      toast("User not found");
      return;
    }
    if (user.data[0].PASSWORD !== formData.password) {
      setLoading(false);
      toast("Invalid password");
      return;
    }
    dispatch(
      setUser({
        name: user.data[0].NAME,
        email: user.data[0].EMAIL,
        profilePicture: user.data[0].PROFILE_IMAGE,
      })
    );
    localStorage.setItem("user", JSON.stringify(user.data[0]));
  };

  return (
    <Authlayout>
      {loading && <Loader />}
      <div className="sm:w-1/2 m-auto flex sm:flex-row flex-col">
        <Card
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
                <BigText varient="primary" text="Sign In" />
              </div>
            </div>
          }
        >
          <div className="flex flex-col w-full *:my-2 ">
            <TextInput
              id="email"
              label="Email"
              placeholder="Enter your email address"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Checkbox
              label="Remember me"
              onChange={() => console.log("Remember me")}
            />
            <Button
              fullWidth
              severity="primary"
              text="Sign In"
              onClick={handleSignin}
            />
            <Typography
              className="text-center text-gray-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500">
                Register
              </a>
            </Typography>
          </div>
        </Card>
      </div>
    </Authlayout>
  );
}
