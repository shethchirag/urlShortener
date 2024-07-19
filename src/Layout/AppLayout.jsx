import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      {/*footer*/}
      <div className="p-10 text-center bg-gray-800 mt-10 text-white">
        Made with 😍 Chirag
      </div>
    </div>
  );
};

export default AppLayout;
