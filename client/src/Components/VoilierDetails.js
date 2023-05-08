import { Button, Container, Row, Col } from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';

import '../assets/VoilierDetails.css';
import useFetch from '../useFetch';

function VoilierDetails() {
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
              <img src={voiliers.images} alt={voiliers.Nom} />
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
