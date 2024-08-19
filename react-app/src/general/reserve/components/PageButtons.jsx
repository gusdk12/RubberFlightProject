import React from 'react';
import style from '../css/search.module.css';

const PageButtons = ({ currentPage, setCurrentPage, results, itemsPerPage }) => {

  const totalPages = Math.max(1, Math.ceil(results.combinations.length / itemsPerPage));

  return (
    <div className={style.pageButtons}>
      <button 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
      >
        이전
      </button>
      <span>페이지 {currentPage} / {totalPages}</span>
      <button 
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        다음
      </button>
    </div>
  );
};

export default PageButtons;
