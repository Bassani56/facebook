import { createBrowserRouter } from "react-router";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Feed,
  },
  {
    path: "/profile/:userId?",
    Component: Profile,
  },
]);