import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Sidebar({ show }) {
    const router = useRouter();
    return (
        <div className={`sidebar ${show ? 'active-sidebar' : ''}`}>
            <div className="sidebar-menu">
                <div className="item">
                    <Link href="/dashboard" className={`menu-btn ${router.pathname === "/dashboard" ? "active" : ""}`}><i className="fas fa-desktop"></i><span>Dashboard</span></Link>
                </div>
                <div className="item">
                    <Link href="/logs" className={`menu-btn ${router.pathname === "/logs" ? "active" : ""}`}><i className="fa-solid fa-clock-rotate-left"></i><span>Logs</span></Link>
                </div>
                <div className="item" >
                    <Link href="#" className={`menu-btn ${router.pathname === "#" ? "active" : ""}`}><i className="fas fa-cog"></i><span>Setting</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
