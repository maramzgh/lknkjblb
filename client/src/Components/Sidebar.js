import React, { useState } from 'react';
import '../assets/Sidebar.css';
import { Button, Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import useFetch from '../useFetch';

const Sidebar = ({
  priceRange,
  setPriceRange,
  modèleFilter,
  setModèleFilter,
  longueurFilter,
  setLongueurFilter,
  anneeFilter,
  setAnneeFilter,
}) => {
  const {
    data: voiliers,
    // eslint-disable-next-line
    isPending,
    // eslint-disable-next-line
    error,
  } = useFetch('http://localhost:5000/voiliers'); //Price Slider
  const pricesString =
    voiliers
      ?.map((voilier) => {
        const price = voilier.Prix;
        if (price) {
          const numericString = price
            .match(/\d[\d\s,.]*/)?.[0]
            .replace(/[^\d.]/g, '')
            .replace(',', '.');
          if (numericString) {
            return Number(numericString);
          } else {
            // console.log(`Could not convert "${price}" to a number`);
          }
        }
        return null;
      })
      .filter((price) => price !== null) || [];

  const minPrice = Math.min(...pricesString);
  const maxPrice = Math.max(...pricesString);

  //max display
  const [maxDisplayModèle, setMaxDisplayModèle] = useState(10);
  const handleShowMoreModèle = () => {
    setMaxDisplayModèle(maxDisplayModèle + 5);
  };

  const [maxDisplayLongueur, setMaxDisplayLongueur] = useState(10);
  const handleShowMoreLongueur = () => {
    setMaxDisplayLongueur(maxDisplayLongueur + 5);
  };
  const [maxDisplayAnnee, setMaxDisplayAnnee] = useState(10);
  const handleShowMoreAnnee = () => {
    setMaxDisplayAnnee(maxDisplayAnnee + 5);
  };

  //avoid repetition
  const modèles = voiliers?.map((voilier) => voilier.Fabricant) || [];
  const longueurs = voiliers?.map((voilier) => voilier.Longueur) || [];
  const annees = voiliers?.map((voilier) => voilier.Année) || [];

  const modèle = [...new Set(modèles)];
  const longueur = [...new Set(longueurs)];
  const annee = [...new Set(annees)];

  //Price
  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  //Marque

  const handleModèleFilterChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setModèleFilter([...modèleFilter, brand]);
    } else {
      setModèleFilter(modèleFilter.filter((f) => f !== brand));
    }
  };
  // Longueur

  const handleLongueurFilterChange = (event) => {
    const height = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setLongueurFilter([...longueurFilter, height]);
    } else {
      setLongueurFilter(longueurFilter.filter((f) => f !== height));
    }
  };
  // Annee
  const handleAnneeFilterChange = (event) => {
    const year = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setAnneeFilter([...anneeFilter, year]);
    } else {
      setAnneeFilter(anneeFilter.filter((f) => f !== year));
    }
  };

  return (
    <Container className="Sidebar ">
      <h2 className="Title">Filtrer</h2>
      <p>Prix</p>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75% ', margin: '15px' }}
      ></Slider>
      <hr />

      <p>Modèle</p>
      <Form>
        {modèle.slice(0, maxDisplayModèle).map((m) => (
          <Form.Check
            key={m}
            type="checkbox"
            label={m}
            value={m}
            onChange={handleModèleFilterChange}
          ></Form.Check>
        ))}
      </Form>
      {modèle.length > maxDisplayModèle && (
        <Button variant="link" className="my-3" onClick={handleShowMoreModèle}>
          {` (${modèle.length - maxDisplayModèle} more)`}
        </Button>
      )}
      <p>Longueur</p>
      <Form>
        {longueur.slice(0, maxDisplayLongueur).map((l) => (
          <Form.Check
            key={l}
            type="checkbox"
            label={l}
            value={l}
            onChange={handleLongueurFilterChange}
          ></Form.Check>
        ))}
      </Form>
      {longueur.length > maxDisplayLongueur && (
        <Button
          variant="link"
          className="my-3"
          onClick={handleShowMoreLongueur}
        >
          {` (${longueur.length - maxDisplayLongueur} more)`}
        </Button>
      )}
      <p>Année</p>
      <Form>
        {annee.slice(0, maxDisplayAnnee).map((a) => (
          <Form.Check
            key={a}
            type="checkbox"
            label={a}
            value={a}
            onChange={handleAnneeFilterChange}
          ></Form.Check>
        ))}
      </Form>
      {annee.length > maxDisplayAnnee && (
        <Button variant="link" className="my-3" onClick={handleShowMoreAnnee}>
          {` (${annee.length - maxDisplayAnnee} more)`}
        </Button>
      )}
    </Container>
  );
};

export default Sidebar;
