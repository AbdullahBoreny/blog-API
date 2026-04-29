import Accounts from "./components/Accounts";
import App from "./components/App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./misc/ErrorPage";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />

  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: '/log-in',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/accounts',
    element: <Accounts />,
    errorElement: <ErrorPage />
  },
  {
    path: '/edit',
    element: <Accounts />,
    errorElement: <ErrorPage />
  }

];

export default routes;
