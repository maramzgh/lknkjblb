import React, { useState } from 'react';
import useFetch from '../useFetch';
import Voiliers from '../Components/Voiliers';
import Pagination from '../Components/Pagination';
import Sidebar from '../Components/Sidebar';
import '../assets/AllVoiliers.css';
import CircularProgress from '@mui/material/CircularProgress';

const AllVoiliers = () => {
  // eslint-disable-next-line
  const [voilierPerPage, setVoilierPerPage] = useState(20);
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers');
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
  // states
  const [priceRange, setPriceRange] = useState([0, 100000000]);

  const [currentPage, setCurrentPage] = useState(1);
  const [marqueFilter, setMarqueFilter] = useState([]);
  const [longueurFilter, setLongueurFilter] = useState([]);
  const [anneeFilter, setAnneeFilter] = useState([]);
  const lastVoilierIndex = currentPage * voilierPerPage;
  const firstVoilierIndex = lastVoilierIndex - voilierPerPage;

  //
  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleMarqueFilterChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setMarqueFilter([...marqueFilter, brand]);
    } else {
      setMarqueFilter(marqueFilter.filter((f) => f !== brand));
    }
  };
  const handleLongueurFilterChange = (event) => {
    const height = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setLongueurFilter([...longueurFilter, height]);
    } else {
      setLongueurFilter(longueurFilter.filter((f) => f !== height));
    }
  };
  const handleAnneeFilterChange = (event) => {
    const year = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setAnneeFilter([...anneeFilter, year]);
    } else {
      setAnneeFilter(anneeFilter.filter((f) => f !== year));
    }
  };
  //
  const filtredVoiliers =
    voiliers?.filter((voilier) => {
      const numericString = voilier.Prix?.match(/\d[\d\s,.]*/)?.[0]
        .replace(/[^\d.]/g, '')
        .replace(',', '.');
      const price = numericString ? Number(numericString) : null;

      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      const anneeMatch = anneeFilter.includes(voilier.Année);
      const marqueMatch = marqueFilter.includes(voilier.Fabricant);
      const longueurMatch = longueurFilter.includes(
        voilier.Longueur?.toString()
      );

      // Check if any filter is applied
      const hasFilter =
        anneeFilter.length > 0 ||
        marqueFilter.length > 0 ||
        longueurFilter.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < maxPrice;

      // Filter voiliers based on the selected filters
      if (hasFilter) {
        if (anneeFilter.length > 0) {
          if (!anneeMatch) {
            return false;
          }
        }

        if (marqueFilter.length > 0) {
          if (!marqueMatch) {
            return false;
          }
        }

        if (longueurFilter.length > 0) {
          if (!longueurMatch) {
            return false;
          }
        }

        if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
          if (!priceMatch) {
            return false;
          }
        }

        // Return voiliers that match any of the filters
        return marqueMatch || longueurMatch || anneeMatch || priceMatch;
      }

      // No filters applied, return all voiliers
      return true;
    }) || [];

  const currentVoiliers = filtredVoiliers
    ? filtredVoiliers.slice(firstVoilierIndex, lastVoilierIndex)
    : [];

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isPending && (
        <div className="loading">
          <div>
            <CircularProgress />
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      )}
      {voiliers && (
        <>
          <div className="Allsailboats">
            <div className="theSideBar">
              <Sidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handlePriceRangeChange={handlePriceRangeChange}
                marqueFilter={marqueFilter}
                setMarqueFilter={setMarqueFilter}
                handleMarqueFilterChange={handleMarqueFilterChange}
                longueurFilter={longueurFilter}
                setLongueurFilter={setLongueurFilter}
                handleLongueurFilterChange={handleLongueurFilterChange}
                anneeFilter={anneeFilter}
                setAnneeFilter={setAnneeFilter}
                handleAnneeFilterChange={handleAnneeFilterChange}
              ></Sidebar>
            </div>
            <div className="theSailBoats">
              <Voiliers voiliers={currentVoiliers} />
            </div>
          </div>
          <Pagination
            totalVoiliers={voiliers.length}
            voilierPerPage={voilierPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllVoiliers;