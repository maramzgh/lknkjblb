import React, { useState } from 'react';
import '../assets/Sidebar.css';
import { Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import useFetch from '../useFetch';

const Sidebar = ({ id }) => {
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers'); //Price Slider
  const prices = voiliers?.map((voilier) => voilier.Prix) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([]);

  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  //avoid repetition
  const marques = voiliers?.map((voilier) => voilier.Fabricant) || [];
  const longueurs = voiliers?.map((voilier) => voilier.Longueur) || [];
  const annees = voiliers?.map((voilier) => voilier.Année) || [];

  const marque = [...new Set(marques)];
  const longueur = [...new Set(longueurs)];
  const annee = [...new Set(annees)];

  const products =
    voiliers?.filter(
      (product) =>
        product.Prix >= priceRange[0] && product.Prix <= priceRange[1]
    ) || [];

  //Marque
  const [marqueFilter, setMarqueFilter] = useState([]);
  const handleMarqueFilterChange = (event) => {
    const marque = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setMarqueFilter([...marqueFilter, marque]);
    } else {
      setMarqueFilter(marqueFilter.filter((f) => f !== marque));
    }
  };
  // Longueur
  const [longueurFilter, setLongueurFilter] = useState([]);
  const handleLongueurFilterChange = (event) => {
    const longueur = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setLongueurFilter([...longueurFilter, longueur]);
    } else {
      setLongueurFilter(longueurFilter.filter((f) => f !== longueur));
    }
  };

  return (
    <Container className="Sidebar ">
      <h2 className="Title">Filtrer</h2>
      <p>Prix</p>
      <Slider
        value={priceRange}
        onChange={(event, newPriceRange) => setPriceRange(newPriceRange)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75% ', margin: '15px' }}
      ></Slider>
      <hr />

      <p>Marque</p>
      <Form>
        {marque.map((m) => (
          <Form.Check
            key={m}
            type="checkbox"
            label={m}
            value={m}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
      </Form>
      <p>Longueur</p>
      <Form>
        {longueur.map((l) => (
          <Form.Check
            key={l}
            type="checkbox"
            label={l}
            value={l}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
      </Form>
      <p>Annee</p>
      <Form>
        {annee.map((a) => (
          <Form.Check
            key={a}
            type="checkbox"
            label={a}
            value={a}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
      </Form>
    </Container>
  );
};

export default Sidebar;