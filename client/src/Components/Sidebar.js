import React, { useState } from 'react';
import '../assets/Sidebar.css';
import { Button, Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import useFetch from '../useFetch';

const Sidebar = ({
  priceRange,
  setPriceRange,
  marqueFilter,
  setMarqueFilter,
  longueurFilter,
  setLongueurFilter,
  anneeFilter,
  setAnneeFilter,
}) => {
  const {
    data: voiliers,
    isPending,
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
            // console.log(Could not convert "${price}" to a number);
          }
        }
        return null;
      })
      .filter((price) => price !== null) || [];

  const minPrice = Math.min(...pricesString);
  const maxPrice = Math.max(...pricesString);

  //max display
  const [maxDisplayMarque, setMaxDisplayMarque] = useState(10);
  const handleShowMoreMarque = () => {
    setMaxDisplayMarque(maxDisplayMarque + 5);
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
  const marques = voiliers?.map((voilier) => voilier.Fabricant) || [];
  const longueurs = voiliers?.map((voilier) => voilier.Longueur) || [];
  const annees = voiliers?.map((voilier) => voilier.Année) || [];

  const marque = [...new Set(marques)];
  const longueur = [...new Set(longueurs)];
  const annee = [...new Set(annees)];

  //Price
  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  //Marque

  const handleMarqueFilterChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setMarqueFilter([...marqueFilter, brand]);
    } else {
      setMarqueFilter(marqueFilter.filter((f) => f !== brand));
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
      <p>Price</p>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75% ', margin: '15px', color: '#199FB1' }}
      ></Slider>
      <hr />

      <p>Brand</p>
      <Form>
        {marque.slice(0, maxDisplayMarque).map((m) => (
          <Form.Check
            key={m}
            type="checkbox"
            label={m}
            value={m}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
      </Form>
      {marque.length > maxDisplayMarque && (
        <Button variant="link" className="my-3" onClick={handleShowMoreMarque}>
          {` (${marque.length - maxDisplayMarque} more)`}
        </Button>
      )}
      <p>Length</p>
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
      <p>Year</p>
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

