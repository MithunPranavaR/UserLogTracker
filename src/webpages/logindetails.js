import React, { useState, useEffect}  from 'react';
import '../App.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LoginDetails = props  => {
    const { id,logdate } = useParams();

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [login, setLoginDetails] = useState([]);
const [respdata, setData]=useState([]);
const [selectedRow, setSelectedRow] = useState(null);
useEffect(() => {
    axios.get("http://127.0.0.1:8081/api/logs/employees/inout/" + id+"/"+logdate)
    .then(response => {
        setLoginDetails(response.data);
        setIsLoaded(true);
    })
    .catch(error => {
        setIsLoaded(true);
        setError(error);                
      console.error('There was an error fetching the products!', error);
    });    
}, []);
if (error) {
    return <div>Error: {error.message}</div>;
}
if (!isLoaded) {
    return <div>Loading...</div>;
}
if (login) {
    return (
        <div className="App">
        <center><h1>User ID : {id}</h1></center>
        <table>
  <tr>
    <th>Date</th>
    <th>Type</th>
  </tr>        
        {login.map(log => (
  <tr>
    <td>{log.logTime}</td>
    <td>{log.c1}</td>
  </tr>
        ))}
  </table>        
    </div>        
    );
}

}
export default LoginDetails;