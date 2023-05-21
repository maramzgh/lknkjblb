import { Button, Container } from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';

import '../assets/VoilierDetails.css';
import useFetch from '../useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import React, { useState } from 'react';

function VoilierDetails() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const { id } = useParams();
  const {
    data: voiliers,
    error,
    isPending,
  } = useFetch('http://localhost:5000/voiliers/' + id);
  return (
    <Container className="Main">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {voiliers && (
        <article>
          <h1 className="Title">{voiliers.Nom}</h1>
          <div className="Details">
            <div className="Left">
              <img 
              src={require(`../y_imgs/${voiliers.Image}`)} 
              alt={voiliers.Nom}
               />
            </div>
            <div className="Right">
              <div className="Description">{voiliers.Description}</div>

              <div>
                
                <p className="Brand-title">{voiliers.Nom}</p>
                <p className="Price">{voiliers.Prix}</p>
                <p className="Button">
                  
                  <Link to={voiliers.Url}>
                    <Button variant="dark">More details</Button>
                  </Link>
                  <button className="FavoriteButton" onClick={handleToggleFavorite}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={ isFavorite ? 'FavoriteIcon active' : 'FavoriteIcon'}
                  />

                  </button>
              
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </Container>
  );
}

export default VoilierDetails;
