import React, {Component} from 'react';
import axios from "axios";
import Firebase from '../config/Firebase';
import {Alert, Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";

class DeleteUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            confirmMail: "",
            role:"",
            message:"",
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateForm() {
        return this.state.mail.length > 0 &&
            this.state.mail === this.state.confirmMail &&
            this.state.role.length > 0
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
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="mail">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.mail}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmMail">
                        <FormLabel>Confirm email</FormLabel>
                        <FormControl
                            value={this.state.confirmMail}
                            onChange={this.handleChange}
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup controlId="role">
                        <FormLabel>User role</FormLabel>
                        <FormControl as="select"
                                     placeholder="select"
                                     onChange={this.handleChange}>
                            <option value="">Select</option>
                            <option value="users">User</option>
                            <option value="doctors">Doctor</option>
                        </FormControl>
                    </FormGroup>
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
                        onClick={this.handleSubmit}
                    >
                        Delete user
                    </Button>
                </form>
            </div>
        );
    }
}

export default DeleteUser;