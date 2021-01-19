import React from 'react';
import TextField from '@material-ui/core/TextField';

function Search({onSearchChange}) {
    return (
        <div className="search">
            <label className="search__label">Search FirstName LastName or UserName</label>
             <TextField id="outlined-basic" onChange={onSearchChange} placeholder="search patient name or username" variant="outlined" />
        </div>
    )
}
  
export default Search
