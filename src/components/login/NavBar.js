import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="container">
                    <Link className="navbar-brand" to="/">Home<span className="sr-only">(current)</span></Link>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;