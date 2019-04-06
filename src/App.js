import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/main/Home';
import About from './components/main/About';
import MyPageUser from './components/user/MyPageUser';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import MyPageDoctor from './components/doctor/MyPageDoctor';
import MyPageAdmin from './components/admin/MyPageAdmin';


class App extends Component {

  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/myPage/user" component={MyPageUser}/>
            <Route exact path="/myPage/doctor" component={MyPageDoctor}/>
            <Route exact path="/myPage/admin" component={MyPageAdmin} />
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/signUp" component={SignUp}/>
          </div>
        </Router>
    );
  }
}

export default App;
