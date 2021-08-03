import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginated = props => {
    

    return (
      <Pagination aria-label="Page navigation status" className='offset-1 offset-sm-2 col-sm offset-md-4'>
        <PaginationItem>
          <PaginationLink previous href="#"/>
        </PaginationItem>
        {/*Object.keys(pages).map((data, key)=>{
          return <PaginationItem key={key}>
                  <PaginationLink href="#" onClick={()=>paginate(data)}>
                    {Number(data)}
                  </PaginationLink>
                </PaginationItem>
        })*/}
        <PaginationItem>
          <PaginationLink next href="#"/>
        </PaginationItem>
      </Pagination>
    );
  }
  
  export default Paginated;