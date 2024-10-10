import { Outlet } from "react-router-dom";
import Header from "../header/default-header";
import Footer from "../footer";

const DefaultLayout = () => {
    return (
        <div className="relative">
            <div className="min-h-[92.45vh]">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
