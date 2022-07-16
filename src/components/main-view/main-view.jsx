import React from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { CafeView } from "../cafe-view/cafe-view";
import { RegistrationView } from "../registration-view/registration-view";
import { AreaView } from "../area-view/area-view";
import { ProfileView } from "../profile-view/profile-view";
import { Menubar } from "../navbar/menubar";


import { setCafes, setUser } from '../../actions/actions';

import CafesList from '../cafes-list/cafes-list';
import AreasList from "../areas-list/areas-list";

import "./main-view.scss";
import { connect } from "react-redux";


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      areas: []

      
    };
  }
  componentDidMount(){
    let token = localStorage.getItem('token');
    if (token !== null) {
    this.getUser(token);
    this.getCafes(token);
    this.getAreas(token);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user);
    this.getUser(authData.token);
    this.getCafes(authData.token);
    this.getAreas(authData.token);
  }
  getUser(token) {
    const user = localStorage.getItem("user");
    axios.get(`https://cafe-app-la.herokuapp.com/users/${user._id}`, 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
        this.props.setUser(response.data);
 
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  getCafes(token) {
    axios.get("https://cafe-app-la.herokuapp.com/cafes", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
        this.props.setCafes(response.data);
 
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    getAreas(token) {
    axios.get("https://cafe-app-la.herokuapp.com/areas", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
        this.setState({
          areas: response.data
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render(){
     let { cafes, user } = this.props;
     let { areas } = this.state;
    return (
      <Router>
        <Menubar user={user}/>
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView cafes={cafes} onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (cafes.length === 0) return <div className="main-view"/>; 
          return <CafesList cafes={cafes}/>;
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col><RegistrationView /> </Col>
        }} />
        <Route path="/cafes/:id" render={({ match, history}) => {
          return <Col md={12}>
            <CafeView cafe={cafes.find(c => c._id === match.params.id)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route exact path="/areas/:name" render={({ match, history }) => {
          return <Col md={12}>
            <AreaView cafe={cafes.find(c => c.Area.Name === match.params.name )} onBackClick={() => history.goBack()} cafes={cafes.filter(c => c.Area.Name === match.params.name)} /></Col>
        }} />
        <Route exact path="/areas" render={() => {
          return <AreasList areas={areas}/>;
        }} />
        <Route path={"/users/:userid"} render={({ history }) => {
          if (!user) return (<Col>
          <LoginView cafes={cafes} onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>)

          return (<ProfileView onBackClick={() => history.goBack()} user={user} />
          )
        }} />
        </Row>
      </Router>  
    );
  }
}

let mapStateToProps = state => {
  return{ cafes: state.cafes,
          user: state.user        
  }
}
export default connect(mapStateToProps, { setCafes, setUser })(MainView);