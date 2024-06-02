import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home/home";
import Login from "./routes/authentication/login";
import AddItem from "./routes/add_item/add_item";
import Items from "./routes/items/items";
import EditItem from "./routes/edit_item/edit_item";
import Route from "./routes/Route";
import Register from "./routes/authentication/register";
import ViewItem from "./routes/view_item/view_item";
import ChatScreen from "./routes/chat_screen/chat_screen";
import ChatList from "./routes/chat_list/chat_list";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Route>
        <Home />
      </Route>
    ),
    children: [],
  },
  {
    path: "/login",
    element: (
      <Route>
        <Login />
      </Route>
    ),
  },
  {
    path: "/register",
    element: (
      <Route>
        <Register />
      </Route>
    ),
  },
  {
    path: "/add-item",
    element: (
      <Route>
        <AddItem />
      </Route>
    ),
  },
  {
    path: "/items",
    element: (
      <Route>
        <Items />
      </Route>
    ),
  },
  {
    path: "/edit-item/:id",
    element: (
      <Route>
        <EditItem />
      </Route>
    ),
  },
  {
    path: "/chat-list",
    element: (
      <Route>
        <ChatList />
      </Route>
    ),
  },
  {
    path: "/chat/:id",
    element: (
      <Route>
        <ChatScreen />
      </Route>
    ),
  },
  {
    path: "/home",
    element: (
      <Route>
        <Home />
      </Route>
    ),
  },
  {
    path: "/view_item/:id",
    element: (
      <Route>
        <ViewItem />
      </Route>
    ),
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default function Router() {
  return (
    <RouterProvider fallbackElement={<div>Loading...</div>} router={router} />
  );
}
