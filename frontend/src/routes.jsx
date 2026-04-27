import Accounts from "./components/Accounts";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Signup from "./components/Signup";
import ErrorPage from "./misc/ErrorPage";
const routes = [
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />

  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: '/posts',
    element: <Posts />,
    errorElement: <ErrorPage />
  },
  {
    path: '/accounts',
    element: <Accounts />,
    errorElement: <ErrorPage />
  }

];

export default routes;
