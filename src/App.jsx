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
import DarkModeProvider from "./context/DarkModeContext";
// Lazy load components
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
// const Cabins = lazy(() => import("./pages/Cabins"));
const CabinsTable = lazy(() => import("./features/cabins/CabinTable"));
const UmrahTable = lazy(() => import("./features/umrah/UmrahTable"));
// const CreateCabinForm = lazy(() => import("./features/cabins/CreateCabinForm"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryCleint = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
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
        element: <CabinsTable />,
        // children: [
        //   {
        //     index: true,
        //     element: <CabinsTable />,
        //   },
        //   {
        //     path: "addCabin",
        //     element: <CreateCabinForm />,
        //   },
        //   {
        //     path: "editCabin",
        //     element: <CreateCabinForm />,
        //   },
        // ],
      },
      {
        path: "umrah",
        element: <UmrahTable />,
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
    if (i18n.language === "ar") {
      document.documentElement.classList.add("ar-app");
      document.documentElement.classList.remove("en-app");
    } else {
      document.documentElement.classList.add("en-app");
      document.documentElement.classList.remove("ar-app");
    }
  }, [i18n.language]);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryCleint}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
