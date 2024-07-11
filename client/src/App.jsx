import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewNavbar from "./components/NewNavbar";

const App = () => {
  return (
    <div className="w-full p-6">
      <NewNavbar />
      <Outlet />
    </div>
  );
};
export default App