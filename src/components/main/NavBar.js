import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logo from '../../images/Logo1.png';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md">
                <img src={Logo} alt="img"/>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">My page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
