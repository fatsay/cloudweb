import React, {Component} from 'react';
import './Jumbotron.css';

class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h4 className="display-4" font="">{this.props.title}</h4>
                    <p className="lead">{this.props.subtitle}</p>
                </div>
            </div>
        );
    }
}

export default Jumbotron;