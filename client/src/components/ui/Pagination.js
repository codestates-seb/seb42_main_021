import '../../Paging.css';
import Pagination from 'react-js-pagination';

const Paging = ({ page, count, setPage }) => {
  const handlePageChange = (page) => {
    setPage(page - 1);
  };

  return (
    <Pagination
      activePage={page + 1}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;