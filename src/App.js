import React, {useState, useEffect, useRef} from 'react';
import Table from './components/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Search from './components/Search';
import axios from 'axios';
import './App.css';
import Filter from './components/Filter';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allRecords, setAllRecords] = useState([]);
  const [records,setRecords] = useState([]);
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(1);
  const table = useRef(null);
  useEffect(()=>{
      getRecords();
  },[])
  const getRecords = async ()=>{
    try{
      const response = await axios.get('https://api.enye.tech/v1/challenge/records');
      const data = response.data.records.profiles
      setAllRecords(data);
      setRecords(data);
      if (data.length > 0){
        setTitles(Object.keys(data[0]))
      }
      setLoading(false);
    }catch(err){
      console.log(err.response);
      setLoading(false);
      setError('something went wrong')
    }
  }
  const handleRetry = ()=>{
    setLoading(true);
    getRecords();
  }
  const handleSearchChange = (e)=>{
    const {value} = e.target;
    //search from allrecords
    const searchrecord = allRecords.filter((record)=>{
      if(record.FirstName.toLowerCase().includes(value.toLowerCase())){
        return true
      }else if(record.LastName.toLowerCase().includes(value.toLowerCase())){
        return true
      }else if(record.UserName.toLowerCase().includes(value.toLowerCase())){
        return true
      }else{
        return false
      }
    })
    setRecords([...searchrecord]);
    setPage(1);
  }
  const getAndFilterData = ()=>{
    const record = allRecords.map(record=>{
      let data = {};
      titles.forEach(title=>{
        data[title] = record[title]
      })
      return data;
    })
    // console.log(record);
    setRecords(record)
  }
  const handleCheckbox = (e) =>{
    const {value, checked} = e.target;
    if(checked){
      // add to titles
      setTitles([...titles,value])
    }else{
      setTitles(titles.filter(title=>title !== value))
    }
  }
  const handleSubmit = ()=>{
    getAndFilterData();
  }
  const paginateRecord = ()=>{
    const start = (page - 1) * 20;
    return records.slice(start, start + 20) 
  }
  const changePageBack = ()=>{
      setPage(page -1);    
      table.current?.scrollIntoView({behavior:'smooth'})
  }
  const changePageNext = ()=>{
    setPage(page + 1);
    table.current?.scrollIntoView({behavior:'smooth'})
  }
const checkDisbledPrev = ()=>{
  return (page <= 1)
}
const checkDisbledNext = ()=>{
  return(records.length <= ((page - 1) * 20 + 20) )
    
}
  if(allRecords < 1){
    return (
      <div className="app-loading">
          {loading? <CircularProgress /> : <>{error}<Button className="refresh" onClick={handleRetry}>try again</Button></>}
      </div>
    )
  }
  return (
    <div className="App">
      <Search onSearchChange={handleSearchChange}/>
      <Filter record={allRecords[0]} 
      onClickCheckbox={handleCheckbox} 
      onClickSubmit={handleSubmit}/>
      <Table tableref={table} records={paginateRecord()}/>
      <div className="navbtn">
        <Button variant="contained"
        disabled={checkDisbledPrev()} 
        onClick={changePageBack}>prev</Button>
        <Button  variant="contained"
        disabled={checkDisbledNext()}
        onClick={changePageNext}>next</Button>
      </div>    
    </div>
  );
}

export default App;
