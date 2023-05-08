import React, { useState } from 'react';
import useFetch from '../useFetch';
import Voiliers from './Voiliers';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import '../assets/AllVoiliers.css';

const AllVoiliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [voilierPerPage, setVoilierPerPage] = useState(10);
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers');
  const lastVoilierIndex = currentPage * voilierPerPage;
  const firstVoilierIndex = lastVoilierIndex - voilierPerPage;
  const currentVoiliers = voiliers
    ? voiliers.slice(firstVoilierIndex, lastVoilierIndex)
    : [];
  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {voiliers && (
        <>
          <div className="Allsailboats">
            <div className="theSideBar">
              <Sidebar />
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