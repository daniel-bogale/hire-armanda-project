import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";


const DefaultLayout = () => {
    return (
        <div className="relative container mx-auto">
            <div className="min-h-[92.45vh]">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
