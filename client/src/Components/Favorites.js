import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../assets//Favorites.css';

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);
  const [sailboats, setSailboats] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
 


  useEffect(() => {
    if (props.userId) {
      fetch(`http://localhost:5000/users/${props.userId}/favorites`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching favorites');
          }
          return response.json();
        })
        .then((data) => {
          setFavorites(data.favorites);
          setIsPending(false);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
          setError(error.message);
          setIsPending(false);
        });
    } else {
      // No user logged in
      setIsPending(false);
    }
  }, [props.userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (favorites.length > 0) {
          const sailboatPromises = favorites.map((sailboatId) =>
            fetch(`http://localhost:5000/voiliers/${sailboatId}`).then((response) => {
              if (!response.ok) {
                throw new Error(`Error fetching sailboat with ID ${sailboatId}`);
              }
              return response.json();
            })
          );
          const sailboatData = await Promise.all(sailboatPromises);
          setSailboats(sailboatData);
        }
      } catch (error) {
        console.error('Error fetching sailboats:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [favorites]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!props.userId) {
    return (
      <div className="container">
        <h2 className="title">Favorites</h2>
        <p className="description">
          Unlock a world of personalized sailing recommendations!<br /> Sign up now to create your favorites list and enjoy customized sailboat suggestions based on your preferences.<br /> Get the most out of your sailing experience by joining us today!
        </p>
        <div className="phrases">
          <p className="phrase">
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
            Click on the heart icon below each sailboat to add it to your favorites list.
          </p>
          <p className="phrase">
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
            Keep track of your preferred products and have a convenient overview of your favorite choices.
          </p>
        </div>
        <ConnectButton className="connect-button" />
      </div>
    );
  }
  

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (sailboats.length === 0) {
    return (
      <div className="container">
      <h2 className="title">Favorites</h2>
      <div className="content">
        <p className="empty-list">
          <strong>There are no sailboats added to this list.</strong><br />Add products to your Selection by clicking on the heart icon below each sailboat.<br />Here, you can have an overview of the added products.
        </p>
      </div>
    </div>
    );
  }
  
  return (
    <div>
      <h2 className="title">Favorites</h2>
      <div className="voiliers">
        {sailboats.map((sailboat) => (
          <Card key={sailboat._id} className="m-3 hover-shadow">
            <Link
              to={`/voiliers/${sailboat._id}`}
              className="link-no-decoration"
            >
              <Card.Img
                variant="top"
                src={require(`../y_imgs/${sailboat.Image}`)}
                alt={sailboat.Nom}
              />
            </Link>
            <Card.Body>
              <Card.Title className="text-center">{sailboat.Nom}</Card.Title>
              <Card.Text className="text-center"> {sailboat.Prix}</Card.Text>
            </Card.Body>
            <Link
              to={`/voiliers/${sailboat._id}`}
              className="link-no-decoration"
            >
              <Button style={{ backgroundColor: '#20636F' }} className="w-100">
                View more
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Favorites; 