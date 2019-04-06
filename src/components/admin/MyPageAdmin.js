import React, {Component} from 'react';
import NavBar from '../main/NavBar';
import Jumbotron from '../main/Jumbotron';
import '../main/Home.css';
import {Row,Col} from 'react-bootstrap';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import Firebase from '../config/Firebase';
class MyPageAdmin extends Component {

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
        return (
            <div className="container">
                    <NavBar/>
                    <Jumbotron title="My page" subtitle=""/>
                    <Row>
                        <Col sm={4}>
                            <hr/>
                            <DeleteUser/>
                        </Col>
                        <Col sm={8}>
                            <hr/>
                            <AddUser/>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default MyPageAdmin;