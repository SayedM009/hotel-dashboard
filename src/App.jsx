import { lazy, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// Lazy load components
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const CabinsTable = lazy(() => import("./features/cabins/CabinTable"));
const CreateCabinForm = lazy(() => import("./features/cabins/CreateCabinForm"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryCleint = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// Define routes
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Navigate replace to="/" />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "cabins",
        element: <Cabins />,
        children: [
          {
            index: true,
            element: <CabinsTable />,
          },
          {
            path: "addCabin",
            element: <CreateCabinForm />,
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryCleint}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
