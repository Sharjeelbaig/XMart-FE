import axios from "axios";
import { setUser } from "../storage/user/userSlice";

export function autoLogin(dispatch: any) {
  const user = localStorage.getItem("user");
  if (user) {
    const userEmail = JSON.parse(user).EMAIL;
    axios.get(`http://localhost:3000/get/user/${userEmail}`).then((res) => {
      const user = res.data;
      dispatch(
        setUser({
          name: user[0].NAME,
          email: user[0].EMAIL,
          profilePicture: user[0].PROFILE_IMAGE,
        })
      );
      localStorage.setItem("user", JSON.stringify(user[0]));
    });
  }
}
