import Index from "./pages/Index/Index";

import AdminPanel from "./pages/AdminPanel/AdminPanel";
import PAdminIndex from "./pages/AdminPanel/PAdminIndex/PAdminIndex"
import Users from "./pages/AdminPanel/Users/Users"
import AdminProducts from "./pages/AdminPanel/AdminProducts/AdminProducts"
import AdminCategory from "./pages/AdminPanel/AdminCategory/AdminCategory"
import Offs from "./pages/AdminPanel/Offs/Offs"
import Menus from "./pages/AdminPanel/Menus/Menus"
import Payments from "./pages/AdminPanel/Payments/Payments"
import Categories from "./pages/AdminPanel/Categories/Categories";
import Profile from "./pages/Profile/Profile";

import Information from "./pages/Profile/Information/Information";
import Orders from "./pages/Profile/Orders/Orders";
import OrdersOfUsersProf from "./pages/Profile/OrdersOfUsersProf/OrdersOfUsersProf";

import IndexOfPayments from "./pages/AdminPanel/Payments/IndexOfPayments/IndexOfPayments";
import Details from "./pages/AdminPanel/Payments/Details/Details";

import AwaitingPayment from "./pages/Profile/Orders/AwaitingPayment/AwaitingPayment";
import Paid from "./pages/Profile/Orders/Paid/Paid";
import Canceled from "./pages/Profile/Orders/Canceled/Canceled";
import { Navigate, redirect } from "react-router-dom";

import IndexOfUsers from "./pages/AdminPanel/Users/IndexOfUsers/IndexOfUsers";
import ProductSelector from "./pages/ProductSelector/ProductSelector";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import OrderRegistration from "./pages/OrderRegistration/OrderRegistration";

import DetailsOfUser from "./pages/AdminPanel/Users/DetailsOfUser/DetailsOfUser";
import OrdersOfUsers from "./pages/AdminPanel/Users/OrdersOfUsers/OrdersOfUsers";
import PaidOrdersOfUser from "./pages/AdminPanel/Users/OrdersOfUsers/PaidOrdersOfUser/PaidOrdersOfUser";
import CanceledOrdersInUsers from "./pages/AdminPanel/Users/OrdersOfUsers/CanceledOrdersInUsers/CanceledOrdersInUsers";
import AwaitingPaymentOrderInUser from "./pages/AdminPanel/Users/OrdersOfUsers/AwaitingPaymentOrderInUser/AwaitingPaymentOrderInUser";
import OrderDetailsOfUsers from "./pages/AdminPanel/Users/OrderDetailsOfUsers/OrderDetailsOfUsers";

import Sliders from "./pages/AdminPanel/Sliders/Sliders";
import IndexSliders from "./pages/AdminPanel/Sliders/MSliders/IndexSliders";
import Poster from "./pages/AdminPanel/Sliders/Poster/Poster";
import IndexPoster from "./pages/AdminPanel/Sliders/Poster/IndexPoster";
import DetailsPoster from "./pages/AdminPanel/Sliders/Poster/DetailsPoster/DetailsPoster";
import EditPoster from "./pages/AdminPanel/Sliders/Poster/EditPoster/EditPoster";
import EditSliders from "./pages/AdminPanel/Sliders/MSliders/EditSliders/EditSliders";
import MSliders from "./pages/AdminPanel/Sliders/MSliders/MSliders";
import DetailsSlider from "./pages/AdminPanel/Sliders/MSliders/DetailsSlider/DetailsSlider";
import Register from "./pages/Register/Register"
import AdminProductsMain from "./pages/AdminPanel/AdminProducts/AdminProductsMain/AdminProductsMain";
import AddNewProduct from "./pages/AdminPanel/AdminProducts/AddNewProduct/AddNewProduct";
import AdminBrands from "./pages/AdminPanel/AdminBrands/AdminBrands";
import EditProduct from "./pages/AdminPanel/AdminProducts/EditProduct/EditProduct";

import Verify from "./pages/Verify/Verify";

import AboutUs from "./pages/AboutUs/AboutUs";
import Rules from "./pages/Rules/Rules";
import ContactUs from "./pages/ContactUs/ContactUs";
import Privacy from "./pages/Privacy/Privacy";

//       { path: "", element: <PAdminIndex /> }
const routes = [
  { path: "/", element: <Index /> },
  { path: "/register", element: <Register /> },
  { path: "/ProductSelector", element: <ProductSelector /> },
  { path: "/orderRegistration", element: <OrderRegistration /> },
  { path: "/productInfo", element: <ProductInfo /> },
  { path: "/profile",
    element: <Profile />,
    children: [
      { path: "", element: <Information /> },
      { path: "ordersOfUsersProf", element: <OrdersOfUsersProf /> },
      {
        path: "orders",
        element: <Orders />,
        children: [
          { path: "", element: <Navigate to="AwaitingPayment" /> },
          { path: "AwaitingPayment", element: <AwaitingPayment /> },
          { path: "paid", element: <Paid /> },
          { path: "canceled", element: <Canceled /> },
        ]
      },
    ],
  },
  { path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "", element: <Navigate to="users" /> },
      { path: "categories", element: <Categories /> },
      { path: "sliders",
        element: <Sliders />,
        children: [
          { path: "", element: <Navigate to="indexSliders" /> },
          {
            path: "indexSliders",
            element: <IndexSliders />,
            children: [
              { path: "", element: <MSliders /> },
              { path: "detailsSliders", element: <DetailsSlider /> },
              { path: "editSliders", element: <EditSliders /> }
            ]
          },
          {
            path: "indexPoster",
            element: <IndexPoster />,
            children: [
              { path: "", element: <Poster /> },
              { path: "detailsPoster", element: <DetailsPoster /> },
              { path: "editPster", element: <EditPoster /> }
            ]
          },
        ]
      },
      { path: "users",
        element: <Users />,
        children: [
          { path: "", element: <IndexOfUsers /> },
          { path: "orderDetailsOfUsers", element: <OrderDetailsOfUsers /> },
          { path: "detailsOfUser", element: <DetailsOfUser /> },
          {
            path: "ordersOfUsers",
            element: <OrdersOfUsers />,
            children: [
              { path: "", element: <Navigate to="awaitingPaymentOrderInUser" /> },
              { path: "awaitingPaymentOrderInUser", element: <AwaitingPaymentOrderInUser /> },
              { path: "paidOrdersOfUser", element: <PaidOrdersOfUser /> },
              { path: "canceledOrdersInUsers", element: <CanceledOrdersInUsers /> },
            ]
          },
        ]
      },
      { path: "adminProducts",
        element: <AdminProducts />,
        children: [
          { path: "", element: <Navigate to="adminProductsMain" /> },
          { path: "adminProductsMain", element: <AdminProductsMain /> },
          { path: "addNewProduct", element: <AddNewProduct /> },
          { path: "editProduct", element: <EditProduct /> },
        ]

      },
      { path: "menus", element: <Menus /> },
      { path: "adminBrands", element: < AdminBrands /> },
      { path: "payments",
        element: <Payments />,
        children: [
          { path: "", element: <IndexOfPayments /> },
          { path: "details", element: <Details /> },
        ]
      },

    ],
  },
  {path: "/verify", element: <Verify />},
  { path: "/aboutUs", element: < AboutUs /> },
  { path: "/rules", element: < Rules /> },
  { path: "/contactUs", element: <ContactUs  /> },
  { path: "/privacy", element: <Privacy  /> },
];

export default routes;
