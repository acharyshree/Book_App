import React, { useState } from 'react';
import './Addbook.css'; // Import CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addbook = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    author: '',
    genre: '',
    count: 0
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/api/addbook",formData);
    // console.log(formData);
    
    setFormData({
      id: '',
      name: '',
      description: '',
      author: '',
      genre: '',
      count: 0
    })
    navigate('/');    
  };

  const handleback = ()=>{
    navigate('/')
  }

  return (
    <>
      <button style={{position:"absolute",margin:"3rem"}} className='btn' onClick={handleback}>Back</button>
    <div className="form-container" >
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_1">Give ID for your Book:</label>
          <input type="text" id="id_1" name="id" value={formData.id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="count">Count:</label>
          <input type="number" id="count" name="count" value={formData.count} onChange={handleChange} />
        </div>
        <button type="submit" className='btn'>Add Book</button>
      </form>
    </div>
    
    </>
  );
};

export default Addbook;
