import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import { useSidebar } from "../contexts/SidebarContext";

const AppLayout = () => {
    const { isOpen } = useSidebar();

    return (
        <div style={{ 
            backgroundColor: '#FFFFFF', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <NavBar />
            <Sidebar isOpen={isOpen} />
            <main style={{ 
                paddingTop: '80px',
                paddingLeft: isOpen ? '240px' : '80px',
                flex: '1 0 auto',
                transition: 'padding-left 0.3s ease',
            }}>
                <div style={{ padding: '24px' }}>
                    <Outlet />
                </div>
            </main>
            <div style={{ 
                marginLeft: isOpen ? '240px' : '80px',
                transition: 'margin-left 0.3s ease',
                width: `calc(100% - ${isOpen ? '240px' : '80px'})`,
            }}>
                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;


