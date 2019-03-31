import React, {Component} from 'react';
import NavBar from './NavBar';
import Jumbotron from '../main/Jumbotron';
import Firebase from "../config/Firebase";
import {Col, Row} from "react-bootstrap";
import LineChart from "../main/Chart";

class MyPageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:null,
            authenticated:false,
            loading:true
        };
    }

    componentDidMount() {
        const user=Firebase.auth().currentUser;
        if (user) {

            this.setState({
                authenticated: true,
                currentUser: user,
                loading: false
            });

        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
            this.props.history.push('/')
        }
    }

    render() {
        const {loading}=this.state;
        if(loading){
            return<p>Loading...</p>
        }
        const data = [
            {
                label: "Sleeping",
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7],]
            },
            {
                label: "Training",
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            },
        ];
        return (
            <div className="container">
                <NavBar/>
                <Jumbotron title="My page" subtitle=""/>
                <Row>
                    <Col sm={4}>
                        <h4>User</h4>
                        <hr/>
                    </Col>
                    <Col sm={8}>
                        <h4>User Chart</h4>
                        <hr/>
                        <LineChart data={data}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MyPageUser;