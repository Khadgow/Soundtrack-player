import React from "react";
import './navbar.scss'
import {Link} from 'react-router-dom';
const Navbar = () => {

    return(
        <nav className="navbar">
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music"
                             className="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path>
                        </svg>
                        <span className="link-text">List</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites"  className="nav-link">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark"
                             className="svg-inline--fa fa-bookmark fa-w-12" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="currentColor"
                                  d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
                        </svg>
                        <span className="link-text">Favorites</span>
                    </Link>
                </li>
            </ul>

        </nav>
    )

};

export default Navbar;
