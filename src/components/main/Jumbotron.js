import React, {Component} from 'react';
import './Jumbotron.css';
import {Button} from "react-bootstrap";
class Jumbotron extends Component {

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h4 className="display-4" font="">{this.props.title}</h4>
                    <p className="lead">{this.props.subtitle}</p>
                    <p>
                        <Button variant='success'
                                href='/signUp'
                        >Register now</Button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Jumbotron;