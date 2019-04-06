import React, {Component} from 'react';
import './Home.css';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import {Card,CardImg,CardGroup,Row,Col} from "react-bootstrap";
import WebImg from '../../images/Web.png';
import AppImg from '../../images/Android.png';
import CLoudImg from '../../images/Cloud.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={

        };
        this.handleChange=this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){

    }
    render(){
        return(
                <div className="container">
                    <NavBar/>
                    <Jumbotron title="My Heartbeat" subtitle=""/>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }} className="container">
                                <CardImg variant="top" src={WebImg}/>
                                <CardGroup>
                                    <h4>Web Application</h4>
                                    <p>
                                        A React Web Application where the physician can request the desired user’s data in a given timeframe to be visualized
                                    </p>
                                </CardGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }} className="container">
                                <CardImg variant="top" src={CLoudImg} />
                                <CardGroup>
                                    <h4>Cloud Functions</h4>
                                    <p>
                                        A serverless REST API cloud application that handles  the web application requests and return the desired data.
                                    </p>
                                </CardGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }} className="container">
                                <CardImg variant="top" src={AppImg} />
                                <CardGroup>
                                    <h4>Android Application</h4>
                                    <p>
                                        An Android app reading user’s heart rate and streaming the data to a remote database and the physician can request visualized heart rate data.
                                    </p>
                                </CardGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
        )
    }
}

export default Home;