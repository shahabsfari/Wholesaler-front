import Index from "./pages/Index/Index";

import AdminPanel from "./pages/AdminPanel/AdminPanel";
import PAdminIndex from "./pages/AdminPanel/PAdminIndex/PAdminIndex"
import Users from "./pages/AdminPanel/Users/Users"
import AdminProducts from "./pages/AdminPanel/AdminProducts/AdminProducts"
import AdminCategory from "./pages/AdminPanel/AdminCategory/AdminCategory"
import Offs from "./pages/AdminPanel/Offs/Offs"
import Menus from "./pages/AdminPanel/Menus/Menus"

const routes = [
  { path: "/", element: <Index /> },
  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminProducts /> },
      { path: "menus", element: <Menus /> },
      { path: "category", element: <AdminCategory /> },
      { path: "offs", element: <Offs /> },
    ],
  },
];

export default routes;
