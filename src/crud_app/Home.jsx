import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3011/pokemon')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='container 01'>
            <h2>Pokemon applikation</h2>
            <Link to="/create" className="link-button">Create new pokmon</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(pokemon => (
                        <tr key={pokemon.id}>
                            <td>{pokemon.name}</td>
                            <td>{pokemon.type}</td>
                            <td>
                                <Link to={`/update/${pokemon.id}`} className="link-button">Update</Link>
                                <button onClick={e => handleDelete(pokemon.id)} className="link-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    function handleDelete(id) {
        axios.delete(`http://localhost:3011/pokemon/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const newData = data.filter(pokemon => pokemon.id !== id);
                    setData(newData);
                }
            })
            .catch(err => console.log(err));
    }
}

export default Home;
