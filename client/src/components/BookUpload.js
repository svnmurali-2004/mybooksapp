import React, { useState } from 'react';
import {useLoader} from '../context/Context'
import axios from 'axios'
const BookUpload = () => {
  const {loginDetails}=useLoader()
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    description: '',
    image: '',
    download_link: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can use the formData state however you like, for example, send it to a server or display it on the page
    try{
    const respo=await axios.post("http://localhost:3001/api/bookupload",formData,{headers:{xtoken:loginDetails.xtoken}})
    if (respo.data.acknowledged){
      alert("book upload success")

    }else{
      alert(respo.data.msg)
    }
    }catch(err){
      if(err.status==400){
        alert("token expired please sign in again")

      }else{
        console.log(err)
      }
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload a Book</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author:
              <input type="text" name="author" value={formData.author} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image URL:
              <input type="text" name="image" value={formData.image} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="download_link">
              Download Link:
              <input type="text" name="download_link" value={formData.download_link} required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" />
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" required className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookUpload;
