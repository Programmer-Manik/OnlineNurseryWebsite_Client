import { Outlet } from "react-router-dom";
import SidebarNavbar from "../ui/SidebarNavbar";

export default function MainLayout() {
    return (
        <div>
            <SidebarNavbar>
                <Outlet />
            </SidebarNavbar>
        </div>
    );
}
