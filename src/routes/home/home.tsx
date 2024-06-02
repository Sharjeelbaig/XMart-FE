import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../storage/store";
import Searchbar from "../../components/home_components/Searchbar";
import { setAllItems } from "../../storage/items/itemsSlice";
import axios from "axios";
import Card from "../../components/common/Card";
import HomeLayout from "../../layouts/HomeLayout";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { autoLogin } from "../../utilities/autoLogin";
import Loader from "../../components/common/loader";

export default function Home() {
  const [searchbar, setSearchbar] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.items);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("items: ", items);
  }, [items]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      autoLogin(dispatch);
    }
  }, [localStorage.getItem("user")]);
  useEffect(() => {
    document.getElementById("root")?.style.setProperty("overflow", "auto");
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/get/products").then((res) => {
      const items = res.data.map((item: any) => {
        return {
          id: item.PRODUCT_ID,
          name: item.NAME,
          description: item.DESCRIPTION,
          price: item.PRICE,
          user_id: item.USER_ID,
          category_id: item.CATEGORY_ID,
          cover_image: item.COVER_IMAGE,
          image: item.IMAGE,
          created_at: item.CREATED_AT,
        };
      });
      dispatch(setAllItems(items));
    });
  }, []);

  useEffect(() => {
    if (items.length && user.name) {
      setLoading(false);
    }
  }, [items]);

  return loading ? (
    <Loader />
  ) : (
    <HomeLayout>
      <Searchbar onChange={(e) => setSearchbar(e.target.value)} />
      <div className="flex gap-5 flex-wrap m-auto justify-around  overflow-y-auto h-full">
        {searchbar === ""
          ? items?.map((item) => (
              <Card
                responsiveWidth
                className="sm:w-52"
                key={item.id}
                header={
                  <div
                    className="w-full h-40 bg-contain bg-no-repeat bg-center "
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  ></div>
                }
              >
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="text-sm font-light">{item.description}</div>
                  <div className="text-sm font-semibold">${item.price}</div>
                </div>
                <div className="w-fit m-auto mt-5">
                  <Button
                    onClick={() => navigate(`/view_item/${item.id}`)}
                    className="m-auto w-fit"
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))
          : items
              .filter((item) =>
                item.name.toLowerCase().includes(searchbar.toLowerCase())
              )
              .map((item) => (
                <Card
                  responsiveWidth
                  className="sm:w-52"
                  key={item.id}
                  header={
                    <div
                      className="w-full h-40 bg-contain bg-no-repeat bg-center "
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                  }
                >
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-sm font-light">{item.description}</div>
                    <div className="text-sm font-semibold">${item.price}</div>
                  </div>
                  <div className="w-fit m-auto mt-5">
                    <Button
                      onClick={() => navigate(`/view_item/${item.id}`)}
                      className="m-auto w-fit"
                    >
                      View
                    </Button>
                  </div>
                </Card>
              ))}
      </div>
    </HomeLayout>
  );
}
