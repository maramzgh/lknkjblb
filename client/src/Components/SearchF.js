import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../useFetch';
import '../assets/SearchResults.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SearchF = ({ searchQuery }) => {
  
  const searchParams = new URLSearchParams(window.location.search);
  const searchValue = searchParams.get('search');

  const [filteredVoiliers, setFilteredVoiliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const { data: voiliers, isPending, error: fetchError } = useFetch('http://localhost:5000/voiliers');

  useEffect(() => {
    if (voiliers) {
      const filtered = voiliers.filter((voilier) => {
        const Nom = voilier.Nom || '';
        const Modèle = voilier.Modèle || '';
        const Fabricant = voilier.Fabricant || '';
        const Description = voilier.Description || '';
        const Location = voilier.Location || '';
        const Type = voilier.Type|| '';
        return (
            Nom?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            Modèle?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            Fabricant?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            Description?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            Location?.toLowerCase().includes(searchValue?.toLowerCase())||
            Type?.toLowerCase().includes(searchValue?.toLowerCase())

          );
          
      });

      setFilteredVoiliers(filtered);
      setLoading(false);
    }
  }, [voiliers, searchValue]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
    }
  }, [fetchError]);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && filteredVoiliers.length === 0 && (
        <p>No results found.</p>
      )}
      {!loading && !error && filteredVoiliers.length > 0 && (
        <div className="voiliers"> {/* Wrap the list in a div with className "voiliers" */}
          {filteredVoiliers.map((voilier) => (
            <Card
              key={voilier._id}
              style={{
                width: '20%',
              }}
              className="m-3 hover-shadow"
            >
              <Link to={`/voiliers/${voilier._id}`} className="link-no-decoration">
                <Card.Img variant="top" src={require(`../y_imgs/${voilier.Image}`)} alt={voilier.Nom} />
              </Link>
              <Card.Body>
                <Card.Title className="text-center">{voilier.Nom}</Card.Title>
                <Card.Text className="text-center">{voilier.Prix}</Card.Text>
              </Card.Body>
              <Link to={`/voiliers/${voilier._id}`} className="link-no-decoration">
                <Button variant="dark" className="w-100">
                  View more
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
  
};

export default SearchF;
