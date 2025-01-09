import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav">
            <FontAwesomeIcon icon={faMugHot} className="nav__logo" />
            <ul className="nav__list" role="list">
                <li className="nav__link">
                    <NavLink to='/' className={ ({isActive}) => isActive ? 'active-link' : undefined }>
                        Home
                    </NavLink>
                </li>
                <li className="nav__link">
                    <NavLink to='/about' className={ ({isActive}) => isActive ? 'active-link' : undefined }>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
