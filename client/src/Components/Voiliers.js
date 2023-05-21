import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Voiliers.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Voiliers = ({ voiliers }) => {
  return (
    <div className="voiliers">
      {voiliers.map((voilier) => (
        <Card
          key={voilier._id}
          style={{
            width: '20%',
          }}
          className="m-3 hover-shadow"
        >
          <Link to={`/voiliers/${voilier._id}`} className="link-no-decoration">
            <Card.Img
              variant="top"
              src={require(`../y_imgs/${voilier.Image}`)}

              alt={voilier.Nom}
            />
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
  );
};


export default Voiliers;
