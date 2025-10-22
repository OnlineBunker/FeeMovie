import React from "react";
import "./Header.css";

const Header = () => {
    return (
      <header className="header">
        <h1 className="logo">idkwhatmywebsitenameis</h1>
        <nav className="nav">
          <a href=''>Home</a>
          <a href="">Movies</a>
          <a href="">About</a>
          <a href="">Contact</a>
        </nav>
      </header>
    );
  };
  
  export default Header;