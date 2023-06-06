import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import '../assets/VoilierDetails.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoilierDetails(props) {
  const { id } = useParams();
  const {
    data: voilier,
    error,
    isPending,
  } = useFetch(`http://localhost:5000/voiliers/${id}`);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = () => {
    fetch(`http://localhost:5000/users/${props.userId}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sailboatId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedFavorites = [...favorites, id];
        setFavorites(updatedFavorites);
        updateLocalStorage(updatedFavorites);
        toast.success('Sailboat added to favorites!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((error) => {
        console.error('Error adding sailboat to favorites:', error);
      });
  };

  const removeFavorite = () => {
    fetch(`http://localhost:5000/users/${props.userId}/favorites/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sailboatId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedFavorites = favorites.filter(
          (favoriteId) => favoriteId !== id
        );
        setFavorites(updatedFavorites);
        updateLocalStorage(updatedFavorites);
        toast.info('Sailboat removed from favorites');
      })
      .catch((error) => {
        console.error('Error removing sailboat from favorites:', error);
      });
  };

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="voilier-details">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {voilier && (
        <article className="voilier-details__article">
          <h1 className="voilier-details__title">{voilier.Nom}</h1>
          <div className="voilier-details__content">
            <div className="voilier-details__image-container">
              <img
                src={require(`../y_imgs/${voilier.Image}`)}
                alt={voilier.Nom}
              />
            </div>
            <div className="voilier-details__description-container">
              <p className="voilier-details__description">
                {voilier.Description}
              </p>
              <div className="voilier-details__details-container">
                {/* Rest of the code... */}
                <div className="voilier-details__button-container">
                  {props.loginSuccess && (
                    <Button
                      style={{ backgroundColor: '#f0f0f0', border: 'none' }}
                      onClick={handleFavoriteClick}
                    >
                      {isFavorite ? (
                        <FavoriteIcon
                          style={{
                            color: '#ff0000',
                            fontSize: '40px',
                            margin: '10px',
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{
                            color: '#0d5c75',
                            fontSize: '40px',
                            margin: '10px',
                          }}
                        />
                      )}
                    </Button>
                  )}
                  <Link to={voilier.Url}>
                    <Button variant="dark" className="voilier-details__button">
                      More Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
      <ToastContainer />{' '}
      {/* Add ToastContainer component at the end of the component */}
    </div>
  );
}

export default VoilierDetails; 