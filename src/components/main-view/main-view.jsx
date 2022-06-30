import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { CafeView } from "../cafe-view/cafe-view";
import { RegistrationView } from "../registration-view/registration-view";
import { AreaView } from "../area-view/area-view";
// import { ProfileView } from "../profile-view/profile-view";
import { Menubar } from "../navbar/menubar";
import { Row, Col, Container } from "react-bootstrap";

import { setCafes } from '../../actions/actions';
import { setAreas } from '../../actions/actions';

import CafesList from '../cafes-list/cafes-list';
import AreasList from "../areas-list/areas-list";

import "./main-view.scss";
import { connect } from "react-redux";


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }
  componentDidMount(){
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
    this.setState({
    user: localStorage.getItem("user")
    });
    this.getCafes(accessToken);
    // this.getAreas(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getCafes(authData.token);
    // this.getAreas(authData.token);

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

  // getAreas(token) {
  //   axios.get("https://cafe-app-la.herokuapp.com/areas", 
  //   {
  //   headers: { Authorization: `Bearer ${token}`}
  //   })
  //   .then(response => {
  //     // Assign the result to the state
  //       this.props.setAreas(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  

  render(){
     let { cafes, areas } = this.props;
     let { user } = this.state;
    return (
      <Router>
        <Menubar user={user}/>
        <Container>
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
          return <Col md={12}><AreasList areas={areas}/></Col>
        }} />
        <Route path={`/users/${user}`} render={({ history }) => {
          if (!user) return <Redirect to="/" /> 
          return <Col>
          <ProfileView cafes={cafes} user={user} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        </Row>
        </Container>
      </Router>  
    );
  }
}

let mapStateToProps = state => {
  return{ cafes: state.cafes,
          areas: state.areas }
}
export default connect(mapStateToProps, { setCafes, setAreas })(MainView);