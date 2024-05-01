import React, { useEffect, useState } from 'react';
import './Books.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Books = ({setShowsignout}) => {
  const navigate=useNavigate()
  // Sample book data
  const [filteredData,setFilteredData]=useState([])
  const [searchData,setSearchData]=useState("")
  const [mainData,setMainData]= useState([])
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
   
    if (JSON.parse(sessionStorage.getItem('islogin')==undefined)){
      alert("please login to proceed")
      navigate("/")
    }
    const run=async()=>{
      const respo1=await axios.get("http://localhost:3001/api/getbooks")
      if(respo1.data.acknowledged===true){
        setMainData(respo1.data.books)
        setFilteredData(respo1.data.books)
      }
    }
    if (mainData.length===0){
      run();
    }
    console.log("useeffect executed")
  
  },[loader])

  const searchHandler=(e)=>{
    const {value}=e.target
    setSearchData(value)
    const fdata=mainData.filter((item)=>(item.name).toLowerCase().includes(value.toLowerCase()))
    setFilteredData(fdata);
  }

  return (
    <>
      <div className="bookstore">
        <h1>BOOK STORE</h1>
        <input type='text' value={searchData} onChange={searchHandler} />
      </div>
      <div className="booklist">
        {filteredData.map((book,index) => (
          <div key={book.id} className="book-item">
            <img src={book.image} alt={book.name} className="book-image" />
            <div className="book-details">
              <h2 className="book-title">{book.name}</h2>
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <p className="book-description">{book.description}</p>
              <button>Download</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
