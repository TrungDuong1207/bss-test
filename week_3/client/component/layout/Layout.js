import { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

function Layout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const hideSidebar = () => {
        setShowSidebar(false);
    };

    return (
        <div className="wrapper">
            <Header show={showSidebar} />
            {showSidebar && <div className="cover" onClick={hideSidebar} />}
            {
                !showSidebar &&
                <div className="sidebar-btn" onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            }

            <Sidebar show={showSidebar} />
            <main className="main-container">{children}</main>
        </div>
    );
}


export default Layout;
