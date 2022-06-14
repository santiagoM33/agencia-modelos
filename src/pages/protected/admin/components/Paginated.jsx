import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginated = props => {
    
    let {currentPage, totalPages, onPageChange} = props;

    const nextPage = () => {
      if(currentPage === totalPages) return null;
      console.log('CurrentPage: ', currentPage)
      console.log('TotalPage: ', totalPages)
      currentPage+=1;
      let offset = (currentPage - 1) * 10;
      onPageChange(currentPage, offset)
    }

    const prevPage = () => {
      if(currentPage === 1) return null;
      currentPage-=1;
      let offset = (currentPage + 1) * 10;
      onPageChange(currentPage, offset)
    }


    return (
      <Pagination aria-label="Page navigation status" className='offset-4 offset-md-10 col-sm'>
        <PaginationItem>
          <PaginationLink previous href="#" onClick={()=>prevPage()}/>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">
                {currentPage}
            </PaginationLink>     
        </PaginationItem>
        <PaginationItem>
        <PaginationLink next href="#" onClick={()=>nextPage()}/>
      </PaginationItem>
      </Pagination>
    );
  }
  
  export default Paginated;