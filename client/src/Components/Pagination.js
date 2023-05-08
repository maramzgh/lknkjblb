import '../assets/Pagination.css';
import { Button } from 'react-bootstrap';
console.log();
function Pagination({
  totalVoiliers,
  voilierPerPage,
  setCurrentPage,
  currentPage,
}) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalVoiliers / voilierPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div
      className="pagination"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {pageNumber.map((page, index) => {
        return (
          <Button
            style={{ margin: '5px', padding: '' }}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
}
export default Pagination;
