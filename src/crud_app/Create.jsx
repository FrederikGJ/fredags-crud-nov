import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Create() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3011/pokemon', { name, type });
      console.log('Pokemon Created:', response.data);
      navigate('/'); // Redirect to home page after successful creation
    } catch (error) {
      console.error('Error creating Pokemon:', error);
      // Handle the error
    }
    setName('');
    setType('');
  };

  // Function to navigate to the home page
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} />

        <button type="submit">Create Pokemon</button>
      </form>
      <button onClick={handleGoHome}>Go to Home</button> 
    </div>
  );
}

export default Create;
