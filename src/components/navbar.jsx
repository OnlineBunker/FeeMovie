import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">FeeMovie</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a target="_blank" href="https://vidsrcme.ru/api/">API</a></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
