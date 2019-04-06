import React, {Component} from 'react';
import Firebase from "../config/Firebase";
import axios from "axios";
import {Alert, Button, Col, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import LineChart from '../main/Chart';

class GetInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message:"",
            date:"",
            time:"",
            graph:"",
            data:[],
            error:''
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateForm() {
        return this.state.email.length > 0 &&
            this.state.graph.length>0 &&
            this.state.date.length>7 &&
            this.state.time.length>4
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
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
                this.setState({data:[resp.data]});
                this.setState({error:""});
            })

        ).catch(error => {
            this.setState({error:"Document not found!!"});
        });
    };

    render() {
        const {loading}=this.state;
        if(loading){
            return<p>Loading...</p>
        }
        const data = this.state.data;
        return (
            <div className='container'>
                <Row>
                    <Col sm={4}>
                        <hr/>
                        <div className='container'>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="email">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>

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
                        </div>
                    </Col>
                    <Col sm={8}>
                        <hr/>
                        <LineChart data={data}/>
                        {this.state.error.length>0 &&
                        <Alert dismissible variant="warning">
                            <Alert.Heading>You got an error!</Alert.Heading>
                            <hr />
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

export default GetInfo;