import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate(); 
    
    useEffect(() => {
        axios.get(`http://localhost:3011/pokemon/${id}`)
             .then(res => {
                 setName(res.data.name);
                 setType(res.data.type);
             })
             .catch(err => console.log(err));
    }, [id]); // Add id as a dependency
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:3011/pokemon/${id}`, { name, type });
        console.log('Pokemon Updated:', response.data);
        navigate('/'); // Redirect to home page after updating
      } catch (error) {
        console.error('Error updating Pokemon:', error);
      }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} 
                onChange={(e) => setName(e.target.value)} />
    
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={type} 
                onChange={(e) => setType(e.target.value)} />
    
                <button type="submit">Update Pokemon</button>
            </form>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

export default Update;

