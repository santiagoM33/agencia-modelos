import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class NavegationPending extends React.Component {
  render() {
    const { pending, currentPage, prevPage, nextPage } = this.props;
    if(!pending) return null;
    const { itemsRemaining, pagesRemaining } = pending;
    if (!itemsRemaining || !pagesRemaining) return null;

    /*const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(itemsRemaining / limit); i++) {
      pageNumbers.push(i);

    }*/

    //const paginate = pageNumber => setCurrentPage(pageNumber)
    //onClick={()=> paginate(number)}

    return (
      <Pagination aria-label="Page navigation status" className={`${!!currentPage ? 'offset-4 offset-sm-4 offset-md-5 mt-4' : 'offset-5 offset-sm-5 offset-md-5 mt-4'} `}>
        {!!currentPage &&
          <PaginationItem>
            <PaginationLink previous href="#" onClick={prevPage} />
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink href="#" className='bg-danger text-white mr-2 ml-2'>{currentPage+1}</PaginationLink>
        </PaginationItem>
        {currentPage > 1 &&
          <PaginationItem>
              {' '}...{' '}
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink next href="#" onClick={nextPage} />
        </PaginationItem>
        
      </Pagination>
    );
  }
}

export default NavegationPending;