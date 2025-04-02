import { useScrollToTop } from "../hooks/hooks";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const RootLayout = () => {
    useScrollToTop();

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout;
