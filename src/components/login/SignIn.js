import React, {Component} from 'react';
import {Button,FormGroup, FormControl,FormLabel,Alert} from "react-bootstrap";
import './SignIn.css';
import NavBar from './NavBar';
import Firebase from '../config/Firebase';
import axios from "axios";

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isValid:"",
            uid:"",
            role:""
        };
        //Bind the functions here
        this.handleSubmit=this.handleSubmit.bind(this);
        this.validateForm=this.validateForm.bind(this);

    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        //user authentication code
        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            this.setState({isValid:"true"});

            let userID=Firebase.auth().currentUser.uid;
            this.setState({uid:userID});

            //get authenticotion token to apicall
            //check user type
            //redirect to the user page
            let token='';
            let user=Firebase.auth().currentUser;
                token=user.getIdToken(true).then(token=>
                    axios.get('https://europe-west1-cloudproject-f25f2.cloudfunctions.net/data/role/'+this.state.email,
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Authorization': 'Bearer ' + token
                            }
                        }).then(resp => {
                        this.setState({role:resp.data.role});
                        if (this.state.role==="doctor"){
                            this.props.history.push('/myPage/doctor')
                        }
                        if (this.state.role==="user"){
                            this.props.history.push('/myPage/user')
                        }
                        if (this.state.role==="admin"){
                            this.props.history.push( '/myPage/admin')
                        }
                    })
                ).catch(error => {
                    this.setState({error: error.toString()});
                });
        }).catch((error)=> {
            this.setState({isValid:"false"});
        });
    };

    render() {

        return (
            <div className="container">
                <NavBar/>
            <div className="Login">
                <h3>Sign in</h3>
                <hr/>
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
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {this.state.isValid==="false" &&
                    <Alert variant="warning">
                        <Alert.Heading>You got an error!</Alert.Heading>
                        <hr />
                        <p>
                            Invalid email or password.
                        </p>
                    </Alert>
                    }
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Sign in
                    </Button>
                </form>
            </div>
            </div>
        );
    }
}

export default SignIn;