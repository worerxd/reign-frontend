import './Navbar.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="navbar">
        <img src="/w-logo.png" alt="logo" width="50" height="50" />
        <ul className="navbarList">
          <a href="https://www.linkedin.com/in/vergaray-moreno-walther/" target="_blank" className="navbar-link" rel="noreferrer">
            <li className="navbarItem">
              <LinkedInIcon />
              Walther Vergaray
            </li>
          </a>

        </ul>
      </div>
    </div>
  );
};

export default NavBar;
