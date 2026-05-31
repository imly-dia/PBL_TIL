import React from "react";


interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <span className="logo">🧡 멋사대학</span>
      </div>
    </header>
  );
}

export default Header;