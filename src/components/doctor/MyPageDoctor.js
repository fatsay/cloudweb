import React, {Component} from 'react';
import NavBar from "../main/NavBar";
import Jumbotron from '../main/Jumbotron';
import GetInfo from './GetInfo';
import Firebase from "../config/Firebase";


class MyPageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
            authenticated:false,
            loading:false
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
                <GetInfo/>
            </div>
        );
    }
}

export default MyPageDoctor;