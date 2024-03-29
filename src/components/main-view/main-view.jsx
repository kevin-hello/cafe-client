import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { CafeView } from "../cafe-view/cafe-view";
import { RegistrationView } from "../registration-view/registration-view";
import { AreaView } from "../area-view/area-view";
import { ProfileView } from "../profile-view/profile-view";
import { FavoriteCafes } from "../favorite-cafes/favorite-cafes";
import { Menubar } from "../navbar/menubar";
import { Row, Col } from "react-bootstrap";

import { setCafes, setAreas } from '../../actions/actions';

import CafesList from '../cafes-list/cafes-list';
import AreasList from "../areas-list/areas-list";

import LoadingSpinner from "../loading-spinner/loading-spinner";

import "./main-view.scss";
import { connect } from "react-redux";

class MainView extends React.Component {

  constructor(){
    super();

    this.state = {
    user: null,
    isLoading: false,
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
    this.setState({
    user: localStorage.getItem('user')
    });
    this.getCafes(accessToken);
    this.getAreas(accessToken);    
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
    user: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userID', authData.user._id);
    localStorage.setItem('user', JSON.stringify(authData.user));

    this.getCafes(authData.token);
    this.getAreas(authData.token);
  }

  getCafes(token) {
    this.setState({
            isLoading: true
          });
    axios.get("https://cafe-app-la.herokuapp.com/cafes", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
            isLoading: false
          });
      // Assign the result to the state
        this.props.setCafes(response.data);
    })
    .catch(response =>{
      this.setState({
            isLoading: false
          });
      console.log(response);
    });
  }

    getAreas(token) {
    this.setState({
            isLoading: true
          });
    axios.get("https://cafe-app-la.herokuapp.com/areas", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
            isLoading: false
          });
      // Assign the result to the state
      this.props.setAreas(response.data);
      
    })
    .catch(response =>{
      this.setState({
            isLoading: false
          });
      console.log(response);
    });
  }

  
  render(){
     let { cafes, areas } = this.props;
     let { user, isLoading } = this.state;

    return (
      <Router>
        {isLoading && <LoadingSpinner text={'Loading...'}/>}
        <Menubar/>
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
          return <AreaView area={areas.find(a=> a.AreaName === match.params.name )} cafe={cafes.find(c => c.Area.Name === match.params.name )} onBackClick={() => history.goBack()} cafes={cafes.filter(c => c.Area.Name === match.params.name)} />
        }} />
        <Route exact path="/areas" render={() => {
          return <AreasList areas={areas}/>
        }} />
        <Route path={`/profile`} render={() => {
          if (!user) return (<Col>
          <LoginView cafes={cafes} onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>)
          return <ProfileView/>

        }} />
        <Route path="/favorites" render={({ history }) => {
          return <FavoriteCafes cafes={cafes} onBackClick={() => history.goBack()}/>
        }} />
        </Row>
      </Router>  
    );
  }
}

let mapStateToProps = state => {
  return{ cafes: state.cafes, areas: state.areas,
       
  }
}
export default connect(mapStateToProps, { setCafes, setAreas })(MainView);