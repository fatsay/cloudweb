import React, {Component} from 'react';
import NavBar from '../main/NavBar';
import Jumbotron from '../main/Jumbotron';
import Firebase from "../config/Firebase";
import {Alert, Button, Col, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import LineChart from "../main/Chart";
import axios from "axios";
import './User.css';

class MyPageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:null,
            authenticated:false,
            loading:true,
            data:[],
            email:'',
            graph:'',
            date:'',
            time:'',
            error:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.validateForm=this.validateForm.bind(this);
    }

    componentDidMount() {
        const user=Firebase.auth().currentUser;
        if (user) {

            this.setState({
                authenticated: true,
                currentUser: user,
                loading: false,
                email:user.email.toString()
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    validateForm() {
        return this.state.graph.length>0 &&
            this.state.date.length>7 &&
            this.state.time.length>4
    }
    handleSubmit = event => {
        event.preventDefault();
        let time1=this.state.time;
        let time2=time1.split(":");
        let time3=':'+time2[0];
        let date=this.state.date+time3;
        let token='';
        let user=Firebase.auth().currentUser;
        token=user.getIdToken(true).then(token=>
            axios.get('https://europe-west1-cloudproject-f25f2.cloudfunctions.net/data/'+this.state.email+'/'+date+'/'+this.state.graph,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                this.setState({data:resp.data});
                this.setState({error:""})
            })

        ).catch(error => {
            this.setState({error: error.toString()});
            this.setState({error:"Document not found!!"});
        });
    };
    render() {
        const {loading}=this.state;
        if(loading){
            return<p>Loading...</p>
        }
        const data = [this.state.data];
        return (
            <div className="container">
                <NavBar/>
                <Jumbotron title="My page" subtitle=""/>
                <Row>
                    <Col sm={4}>
                        <h4>User</h4>
                        <hr/>
                        <form onSubmit={this.handleSubmit}>
                            <FormLabel>Date</FormLabel>
                            <FormGroup controlId="date">
                                <FormControl
                                    autoFocus
                                    type="date"
                                    value={this.state.date}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormLabel>Time</FormLabel>
                            <FormGroup controlId="time">
                                <FormControl
                                    autoFocus
                                    type="time"
                                    value={this.state.time}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup controlId="graph">
                                <FormLabel>Graph</FormLabel>
                                <FormControl as="select"
                                             placeholder="select"
                                             onChange={this.handleChange}>
                                    <option value="">Select</option>
                                    <option value="idle">Idle</option>
                                    <option value="moving">Moving</option>
                                </FormControl>
                            </FormGroup>
                            <Button
                                variant='success'
                                block
                                disabled={!this.validateForm()}
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Get data
                            </Button>
                        </form>

                    </Col>
                    <Col sm={8}>
                        <h4>User Chart</h4>
                        <hr/>
                        <LineChart data={data}/>
                        {this.state.error.length > 0 &&
                        <Alert dismissible variant="warning">
                            <Alert.Heading>You got an error!</Alert.Heading>
                            <hr/>
                            <p>
                                {this.state.error}
                            </p>
                        </Alert>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
export default MyPageUser;