import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { GiCoffeeBeans } from 'react-icons/gi';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import { FaRestroom } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loading-spinner/loading-spinner';
// map component
import CafeMap from '../cafe-map/cafe-map';
//UI components 
import {Col, Row, Button} from 'react-bootstrap';
//styling
import './cafe-view.scss';


export class CafeView extends React.Component {

constructor(props) {
    super(props);
    this.state={
      FavoriteCafesList: [],
      isAdding: false,
      isLoading: false,
    };
}
componentDidMount(){
  this.getFavorites();
}

    getFavorites() {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
      this.setState({
        isLoading: true
      });
      axios
        .get(`https://cafe-app-la.herokuapp.com/users/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            FavoriteCafesList: response.data.FavoriteCafes
          });
          this.setState({
            isLoading: false
          });
          console.log(this.state.FavoriteCafesList);
          console.log(this.props.cafe);
        })
        .catch(function (error) {
          this.setState({
            isLoading: false
          });
          console.log(error);
        });
    }

  addFavoriteCafe() {
    const favorites = this.state.FavoriteCafesList;
    const cafeID = this.props.cafe._id;
    const cafeName = this.props.cafe.Name;
    console.log(favorites);
    console.log(cafeID);
    console.log(cafeName);

    let isFavorited = favorites.find(c => c._id === cafeID);
    console.log(isFavorited);
  if (!isFavorited) {
    this.setState({
            isAdding: true
          });
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    
    axios.post(`https://cafe-app-la.herokuapp.com/users/${userID}/cafes/${cafeID}`, {}, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'POST'
    })
    .then(response => {
    this.setState({
            isAdding: false
          });
      console.log(response);
      alert(`${cafeName} has been added to your favorites`)
      this.getFavorites();
    })
    .catch(function(error){
    this.setState({
            isAdding: false
          });
      console.log(error);
    });
  }
  else { return alert(`${cafeName} is already in your favorites`)
  }
  };

  render() {
    const {cafe, onBackClick} = this.props;
    const {isAdding, isLoading} = this.state;
    return (
      <>
      <CafeMap cafeName={cafe.Name} lat={cafe.Lat} lng={cafe.Long} />
      <Row className="cafe-view">
        {isAdding && <LoadingSpinner text={'Adding to Favorites...'}/>}
        {isLoading && <LoadingSpinner text={'Loading...'}/>}   
          <Col md={12} lg={4} className="cafe-exterior">
          <img height = "auto" width="100%"  src={cafe.ImagePathExterior}/>
          </Col>
          <Col md={12} lg={4} className="cafe-interior">
          <img height = "auto" width="100%"  src={cafe.ImagePathInterior}/>
          </Col>
          <Col md={12} lg={4} className="cafe-misc">
          <img height = "auto" width="100%"  src={cafe.ImagePathMisc}/>
          </Col>
          <Col md={12} lg={8}>
          <h2>{cafe.Name}</h2>
        <div className="cafe-area">
          <Link to={`/areas/${cafe.Area.Name}`}><span className="value">{cafe.Area.Name}</span>
        </Link></div>
        <div className="cafe-details">
          <span className="label">{cafe.Hours}</span>
        </div>
        <div className="cafe-details">
          {""}
          <span className="label">Phone:
            {cafe.Phone.length === 0 ? <span> Unavailable</span> : <span> {cafe.Phone}</span>}
          </span>
          {""}  
        </div>
        <div className="cafe-details">
          <span className="label">Seating: {cafe.Seating}</span>
        </div>
        <div className="cafe-details">
          <span className="label">Parking: {cafe.Parking}</span>
        </div>
        <span>
        {""}
            {cafe.Website.length === 0 ? <span></span> : <div className="cafe-details"><span className="label"><a href={cafe.Website} target="_blank">Cafe's Website</a></span></div>}
        {""}  
        </span>
        <span>
        {""} 
            {cafe.Instagram.length === 0 ? <span></span> : <div className="cafe-details"><span className="label"><a href={cafe.Instagram} target="_blank">Cafe's Instagram</a></span></div>}
        {""}  
        </span>
        <div className="cafe-details">
          <GiCoffeeBeans
          className="card-icons"
          color={cafe.Beans == true ? '#816550' : '#b8b7b7'}
          size= "1.2em"
          />
          {""}
              {cafe.Beans == true ? <span>Sells Beans</span> : <span>Does not sell Beans</span>}
          {""}  
          </div><div className="cafe-details">
          {""}
              {cafe.Wifi == true ? 
              <FiWifi
              className="card-icons"
              color="#007BFF"
              size="1.2em"
              /> : 
              <FiWifiOff
              className="card-icons"
              color="#b8b7b7"
              size="1.2em"
              />}
            {""}
            {""}
              {cafe.Wifi == true ? <span>Wifi available</span> : <span>No Wifi</span>}
            {""}
          </div><div className="cafe-details">
          <FaRestroom
          className="card-icons"
          color={cafe.Restroom == true ? 'mediumseagreen' : '#b8b7b7'}
          size= "1.2em"
          />
            {""}
              {cafe.Restroom == true ? <span>Restroom available</span> : <span>No Restroom</span>}
            {""}
        </div>
        <Button variant="primary" id="back" onClick={() => { onBackClick(null);}}>Back</Button>
        <Button variant="danger" id="favcafe" value={cafe._id} onClick={(e) => this.addFavoriteCafe(e, cafe)}>Add to favorites</Button>
        </Col>
       </Row>
        </>
    );
  }
}

CafeView.propTypes = {
  cafe: propTypes.shape({
    Name: propTypes.string.isRequired,
    Area: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
      StreetAddress: propTypes.string.isRequired,
      City: propTypes.string.isRequired,
      ZipCode: propTypes.string.isRequired,
    }), 
    Hours: propTypes.string.isRequired,
    Phone: propTypes.string,
    Seating: propTypes.string,
    Parking: propTypes.string,
    Website: propTypes.string,
    ImagePathExterior: propTypes.string.isRequired,
    ImagePathInterior: propTypes.string.isRequired,
    ImagePathMisc: propTypes.string,
    TakeOutOnly: propTypes.boolean,
    Wifi: propTypes.boolean,
    Beans: propTypes.boolean,
    Restroom: propTypes.boolean,
    Instagram: propTypes.string,
    Lat: propTypes.number,
    Long: propTypes.number,
  }).isRequired,
  user: propTypes.shape({
    FavoriteCafesList: propTypes.array.isRequired
  }).isRequired,
  addFavoriteCafe: propTypes.func.isRequired,
  onBackClick: propTypes.func.isRequired
};