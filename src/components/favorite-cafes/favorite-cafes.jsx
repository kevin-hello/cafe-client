import React, { useState, useEffect } from "react";
import axios from 'axios';

// UI elements 
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button } from "react-bootstrap";

// styling 
import './favorite-cafes.scss';

export function FavoriteCafes({user}) {
  const [favoriteCafes, setFavoriteCafes] = useState([]);
  const token = localStorage.getItem('token');
  
const getFavoriteCafes = () => {
    axios
      .get("https://cafe-app-la.herokuapp.com/cafes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteCafes(
          response.data.filter((cafe) => {
            return user.FavoriteCafes.includes(cafe._id);
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      getFavoriteCafes();
    }
  }, [user]);


    const removeFavoriteCafe = (id) => {
    const userID = localStorage.getItem('userID');
    axios.delete(`https://cafe-app-la.herokuapp.com/users/${userID}/movies/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
  ).then((response) => {
    alert("cafe has been removed from your favorites");
    getFavoriteCafes();
  })
  .catch(function(error){
    console.log(error);
  });
  }


    return (
<>
 <Col>
          <h4 className="text-center">Favorite Cafes</h4>
        </Col>
        {favoriteCafes.map(({ ImagePath, Name, _id }) => {
          return (
            <Row>
              <Col
                key={_id}
              >
                <Figure className="text-center">
                  <Link to={`/cafes/${_id}`}>
                    <Figure.Image
                      style={{ width: "250px", height: "350px" }}
                      src={ImagePath}
                      alt={Name}
                    />
                  </Link>
                  <Figure.Caption>{Name}</Figure.Caption>
                </Figure>
              </Col>
              <Col md={12} style={{display: "flex", justifyContent: "center", paddingBottom: "100px" }}>
                <Button
                  style={{ marginTop: "20px"}}
                  variant="dark"
                  onClick={() => removeFavoriteCafe(_id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          );
        })}
    </>
    );

    }