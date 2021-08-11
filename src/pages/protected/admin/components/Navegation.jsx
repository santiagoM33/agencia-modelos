import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Navegation = props => {
    const {approved, prevPage, nextPage } = props; 
    const {itemsRemaining, pagesRemaining } = approved; 
    if(!itemsRemaining || !pagesRemaining) return null;

    //const pageNumbers = [];

    /*for (let i = 1; i <= Math.ceil(itemsRemaining / limit); i++) {
      pageNumbers.push(i);
      
    }*/
    
    //const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
      <Pagination aria-label="Page navigation status" className='offset-2 offset-sm-2 col-sm offset-md-4'>
        <PaginationItem>
          <PaginationLink previous href="#" onClick={prevPage}/>
        </PaginationItem>
        {/*pageNumbers.map(number => (
          <PaginationItem key={number}>
           <PaginationLink onClick={()=> paginate(number)} href="#">
            {number}
          </PaginationLink>
          </PaginationItem>
        ))*/}
        <PaginationItem>
          <PaginationLink next href="#" onClick={nextPage}/>
        </PaginationItem>
      </Pagination>
    );
  }
  
  export default Navegation;