import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginated = props => {
    const {postPerPage, pagesRemaining, itemsRemaining, indexOfFirstPost, paginate, nextPage, prevPage} = props;

    //if(loading) return <h3>Loading...</h3>
    const pages = []

    for (let i = 0; i < Math.ceil(itemsRemaining / postPerPage); i++) {
      pages.push(i);
      
    }

    return (
      <Pagination aria-label="Page navigation status" className='offset-1 offset-sm-2 col-sm offset-md-4'>
        <PaginationItem>
          <PaginationLink previous href="#" onClick={()=>prevPage()}/>
        </PaginationItem>
        {Object.keys(pages).map((data, key)=>{
          return <PaginationItem key={key}>
                  <PaginationLink href="#" onClick={()=>paginate(data)}>
                    {Number(data)}
                  </PaginationLink>
                </PaginationItem>
        })}
        <PaginationItem>
          <PaginationLink next href="#" onClick={()=>nextPage()}/>
        </PaginationItem>
      </Pagination>
    );
  }
  
  export default Paginated;