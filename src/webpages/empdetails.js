import React, { useState, useEffect}  from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';

const EmployeeDetails = props  => {
    const { id } = useParams();

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [employee, setEmployeeDetails] = useState([]);

useEffect(() => {
    fetch("http://127.0.0.1:8081/api/logs/usersv3/" + id)
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data);
                setEmployeeDetails(data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}, [])
if (error) {
    return <div>Error: {error.message}</div>;
}
if (!isLoaded) {
    return <div>Loading...</div>;
}  

if (employee) {
    return (
        <div className="App">
        <h1>User ID : {id}</h1>
        <table>
  <tr>
    <th>Date</th>
    <th>First In Time</th>
    <th>Last Out Time</th>
    <th>Productive Time</th>
  </tr>        
        {employee.map(emp => (
  <tr>
    <td>{emp.localdate}</td>
    {/* <td><Link to={`api/logs/employees/inout`}>{user.employeeName}</Link></td> */}
    <td>{emp.firstintime}</td>
    <td>{emp.lastouttime}</td>
    <td>{emp.productivetime}</td>
  </tr>
        ))}
  </table>         
    </div>        
    );
}
}
export default EmployeeDetails;