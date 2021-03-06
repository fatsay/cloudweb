import React, {Component} from 'react';
import {Alert, Button, FormControl, FormGroup, FormLabel,Row,Col} from "react-bootstrap";
import NavBar from './NavBar';
import axios from 'axios';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            confirmEmail: "",
            password: "",
            name: "",
            gender: "",
            dateOfBirth: "",
            isValid: "",
            error: ""
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
        const data = {
            "name":this.state.name,
            "email":this.state.email,
            "password":this.state.password,
            "date_of_birth":this.state.dateOfBirth,
            "gender":this.state.gender
        };
        axios.post('https://europe-west1-cloudproject-f25f2.cloudfunctions.net/register/',
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).then(resp => {
           this.props.history.push('/')
        }
    ).catch(error => {
            this.setState({isValid:"false"});
            this.setState({error:error.toString()});
            console.log(error)
        });
};

    render() {
        return (
            <div className="container">
                <NavBar/>
                <div className="Signin">
                    <h3>Sign up</h3>
                    <hr/>
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
                        {this.state.isValid === "false" &&
                        <Alert dismissible variant="warning">
                            <Alert.Heading>You got an error!</Alert.Heading>
                            <hr/>
                            <p>
                                {this.state.error}
                            </p>
                        </Alert>
                        }
                        <Button
                            variant='success'
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;