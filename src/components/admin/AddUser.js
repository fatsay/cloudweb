import React, {Component} from 'react';
import axios from "axios";
import {Alert, Button, FormControl, FormGroup, FormLabel,Row,Col} from "react-bootstrap";
import Firebase from '../config/Firebase';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            confirmEmail: "",
            password: "",
            name: "",
            gender: "",
            dateOfBirth: "",
            message: ""
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.email === this.state.confirmEmail &&
            this.state.password.length > 0 &&
            this.state.name.length > 0 &&
            this.state.gender.length > 0 &&
            this.state.dateOfBirth.length > 0;
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

        const data = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "date_of_birth": this.state.dateOfBirth,
            "gender": this.state.gender
        };
        if(user!=null){
            token=user.getIdToken(true).then(token=>
            axios.post('https://europe-west1-cloudproject-f25f2.cloudfunctions.net/admins/doctors/',
                JSON.stringify(data),
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
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <FormGroup controlId="email">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId="confirmEmail">
                                <FormLabel>Confirm email</FormLabel>
                                <FormControl
                                    value={this.state.confirmEmail}
                                    onChange={this.handleChange}
                                    type="email"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup controlId="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId="name">
                                <FormLabel>Full name</FormLabel>
                                <FormControl
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup controlId="gender">
                                <FormLabel>Gender</FormLabel>
                                <FormControl as="select"
                                             placeholder="select"
                                             onChange={this.handleChange}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId="dateOfBirth">
                                <FormLabel>Date of birth</FormLabel>
                                <FormControl
                                    placeholder="yyyy-mm-dd"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {this.state.message.length>0 &&
                    <Alert dismissible variant="success">
                        <Alert.Heading>Message!</Alert.Heading>
                        <hr />
                        <p>
                            {this.state.message}
                        </p>
                    </Alert>
                    }
                    <Button
                        variant='success'
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Add doctor
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddUser;