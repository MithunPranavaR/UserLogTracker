import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeDetails = (props) => {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employee, setEmployeeDetails] = useState([]);
  const [respdata, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8081/api/logs/usersv3/" + id)
      .then((response) => {
        setEmployeeDetails(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (employee) {
    return (
      <div className="App">
        <center>
          <h1>User ID : {id}</h1>
        </center>
        <table>
          <tr>
            <th>Date</th>
            <th>First In Time</th>
            <th>Last Out Time</th>
            <th>Productive Time</th>
            <th>Non Productive Time</th>
          </tr>
          {employee.map((emp) => (
            <tr
              style={{
                backgroundColor:
                  selectedRow === emp.localdate ? "yellow" : "white",
              }}
            >
              <td>
                <Link to={`${emp.localdate}`}>{emp.localdate}</Link>
              </td>
              <td>{emp.firstintime}</td>
              <td>{emp.lastouttime}</td>
              <td>{emp.productivetime}</td>
              <td>{emp.nonproductivetime}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
};
export default EmployeeDetails;
