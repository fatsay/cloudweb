import React, {Component} from 'react';
import Firebase from "../config/Firebase";
import axios from "axios";
import {Button, Col, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";

class GetInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message:""
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateForm() {
        return this.state.email.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        let token='';
        let user=Firebase.auth().currentUser;

        if(user!=null){
            token=user.getIdToken(true).then(token=>
                axios.delete('https://europe-west1-cloudproject-f25f2.cloudfunctions.net/admins/'+this.state.role+'/'+this.state.mail,
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(resp => {
                    this.setState({message:resp.data.message});
                })

            ).catch(error => {
                this.setState({message: error.toString()});
                console.log(error)
            });
        }

    };

    render() {
        return (
            <div className='container'>
                <Row>
                    <Col sm={8}>
                        <hr/>
                    </Col>
                    <Col sm={4}>
                        <hr/>
                        <div className='container'>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="email">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.mail}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>

                                <Button
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
                </Row>
            </div>
        );
    }
}

export default GetInfo;