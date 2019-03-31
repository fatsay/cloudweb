import React, {Component} from 'react';
import './Home.css';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import {Button,Card,CardImg,CardGroup,Row,Col} from "react-bootstrap";
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
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                    <Button variant="primary">Details >></Button>
                                </CardGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }} className="container">
                                <CardImg variant="top" src={AppImg} />
                                <CardGroup>
                                    <h4>Android Application</h4>
                                    <p>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                    <Button variant="primary">Details >></Button>
                                </CardGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }} className="container">
                                <CardImg variant="top" src={CLoudImg} />
                                <CardGroup>
                                    <h4>Cloud Functions</h4>
                                    <p>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                    <Button variant="primary">Details >></Button>
                                </CardGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
        )
    }
}

export default Home;