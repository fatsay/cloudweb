import React, {Component} from 'react';
import NavBar from './NavBar';
import Jumbotron from "./Jumbotron";

class About extends Component {
    constructor(props) {
        super(props);
        this.state={

        };
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){

    }

    render(){

        return(
            <div className="container">
                <NavBar/>
                <Jumbotron title="About us" subtitle=""/>
            </div>
        )
    }
}


export default About;