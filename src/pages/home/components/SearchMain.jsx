import React from 'react';

class SearchMain extends React.Component {
    state = {}
    render() {
        return (
            <div className="form-group mt-3 offset-6">
                <input type="text" className="form-control col-12" aria-describedby="emailHelp" placeholder='search...'/>
            </div>
        );
    }
}

export default SearchMain;