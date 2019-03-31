import React, {Component} from 'react';
import NavBar from './NavBar';
import Jumbotron from '../main/Jumbotron';
import './Home.css';
import {Row,Col} from 'react-bootstrap';
import LineChart from './Chart';


class MyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:""
        };
        //Bind the functions here
    }

    componentDidMount() {
     //state will be user email address

    }
    //add method for users to get user type with its email
    //then redirect to userpage

    render() {
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

export default MyPage;