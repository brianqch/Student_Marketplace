import { Outlet } from "react-router-dom";
import NewNavbar from "./components/NewNavbar";

const App = () => {
  return (
    <div className="w-full">
      <NewNavbar />
      <Outlet />
    </div>
  );
};
export default App