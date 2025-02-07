import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav">
            <FontAwesomeIcon icon={faMugHot} className="nav__logo" />
            <ul className="nav__list" role="list">
                <li>
                    <NavLink to='/' className={({isActive}) => (
                        isActive ? 'nav__link nav__link--active' : 'nav__link'
                    )}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about' className={({isActive}) => (
                        isActive ? 'nav__link nav__link--active' : 'nav__link'
                    )}>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
