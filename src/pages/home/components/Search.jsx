import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className="form-group mt-3 col-6">
                <input type="text" className="form-control col-12" aria-describedby="emailHelp" placeholder='search...' />
            </div>
        )
    }
}

export default Search;