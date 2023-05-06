import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Header({show}) {
    const router = useRouter()
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleDropdownClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLogoutClick = () => {
    localStorage.clear(); 
    router.push('/login'); 
  }

  return (
    <div className={`header ${show ? 'active-header' : ''}`}>
      <div className="header-menu">
        <div className="title">
          <i className="fa-solid fa-computer"></i>
          <span className="title-hide">Device Manager</span>
        </div>
        <div className="profile">
          <i className="fas fa-user-circle circle"></i>
          <span id="dropdown-btn" onClick={handleDropdownClick}>
            Welcome John <i className="fas fa-chevron-down drop-down"></i>
          </span>
          {showSubMenu && (
            <div className="sub-menu">
              <Link href="#">
                <span>Info</span>
              </Link>
              <span onClick={handleLogoutClick}>
                <span>Logout</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
