import React, { useEffect, useState } from 'react';
import './Books.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../context/Context.js';

const Books = ({setShowsignout}) => {
  const navigate=useNavigate()
  // Sample book data
  const [filteredData,setFilteredData]=useState([])
  const [searchData,setSearchData]=useState("")
  const [mainData,setMainData]= useState([])
  const {loader,loaderDispatcher,loginDetails,loginDetailsDispatcher}=useLoader()
  
  useEffect(()=>{
   
    if (JSON.parse(sessionStorage.getItem('islogin')===undefined)){
      alert("please login to proceed")
      navigate("/")
    }
    const run=async()=>{
      try{
      loaderDispatcher({type:"FETCH_INIT",payload:"fetching started"})
      const respo1=await axios.post("http://localhost:3001/api/getbooks",{},{headers:{
        'Content-Type': 'application/json',xtoken:loginDetails.xtoken}})
      console.log(respo1.data,"logger")
      if(respo1.data.acknowledged===true){
        setMainData(respo1.data.books)
        setFilteredData(respo1.data.books)
      }
      loaderDispatcher({type:"FETCH_SUCCESS",payload:"fetching started"})
    }catch(err){
      console.log(err.response.status,"logger")
      loaderDispatcher({type:"FETCH_ERROR",payload:"error occured while fetching"})
      if (err.response.status===400){
        loginDetailsDispatcher({type:"RESET_LOGINDETAILS"})
        navigate("/")
      }
    }
    }
    if (mainData.length===0){
      run();
    }
    console.log("useeffect executed")
  
  },[mainData])

  const searchHandler=(e)=>{
    const {value}=e.target
    setSearchData(value)
    const fdata=mainData.filter((item)=>(item.name).toLowerCase().includes(value.toLowerCase()))
    setFilteredData(fdata);
  }
  const deleteHandler=async(_id)=>{
    loaderDispatcher({type:"FETCH_INIT",payload:'fetching started'})
    const respo=await axios.post("http://localhost:3001/api/deletebook",{_id:_id},{headers:{'Content-Type': 'application/json',xtoken:loginDetails.xtoken}})
    loaderDispatcher({type:"FETCH_SUCCESS",payload:"fetched successfully"})
    if (respo.data.acknowledged){
      setMainData([])
    }
  }
  
  return (
    <>
      <div className="bookstore">
        <h1>BOOK STORE</h1>
        <input type='text' className='border-2 border-green-200' placeholder='search here' value={searchData} onChange={searchHandler} />
      </div>
      <div className="booklist">
        {filteredData.map((book,index) => (
          <div key={book.id} className="book-item">
            <img src={book.image} alt={book.name} className="book-image" />
            <div className="book-details">
              <h2 className="book-title">{book.name}</h2>
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <p className="book-description">{book.description}</p>
              <div className='flex  justify-between '>
              <button className='p-1 rounded-md bg-blue-400 active:bg-blue-600' onClick={()=>{
                window.open(book.download_link,"_blank")
              }}>View Book</button>
              {book.download&&
              <button className='p-1 rounded-md bg-blue-400 active:bg-blue-600' onClick={()=>{
                window.open(book.download,"_blank")
              }}>Download</button>}
              {loginDetails.isAdmin &&<>
              <button className='p-1 rounded-md bg-blue-400 active:bg-blue-600' onClick={()=>{
                deleteHandler(book._id)
              }}>delete book</button></>}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
