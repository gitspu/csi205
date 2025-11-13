import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppNabar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const Applayout = ( {products, carts, setToken }) => { 
    return (
        <div>
            <AppHeader />
            <AppNabar products={products} carts={carts} setToken={setToken}/> 
            <Outlet />
            <AppFooter />
        </div>
    );
}

export default Applayout;