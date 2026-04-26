import App from "./components/App";
import Login from "./components/Login";
import Signup from "./components/Signup";
const routes = [
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/sign-up",
    element: <Signup />,
  }

];

export default routes;
