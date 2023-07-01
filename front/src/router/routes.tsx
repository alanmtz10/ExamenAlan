import { createBrowserRouter } from "react-router-dom";
import EmployeeIndex from "../pages/EmployeeIndex";
import EmployeRegister from "../pages/EmployeeRegister";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeIndex />,
  },
  {
    path: "/employee/:id?",
    element: <EmployeRegister />,
  },
]);

export default routes;
