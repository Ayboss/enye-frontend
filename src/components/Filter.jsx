import React from 'react'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
function Filter({record,onClickCheckbox, onClickSubmit}) {
    return (
    <div className="filter">
        <h2 className="filter__heading">Filter Titles</h2>
        <form>
            {record && Object.keys(record).map(title=>{
                return (
                    <span className="app-span" key={title}>
                    {title}:
                    <Checkbox
                    onChange={onClickCheckbox} 
                    value={title}
                    defaultChecked 
                    color="default" />
                    </span>
                )
            })}
            <Button variant="contained" onClick={onClickSubmit}>filter</Button>
        </form>
      </div>
    )
}

export default Filter
