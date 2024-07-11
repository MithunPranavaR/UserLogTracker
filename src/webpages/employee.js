import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Employee = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(users);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8081/api/logs/employees/reqdet")
      .then((response) => {
        setIsLoaded(true);
        setUsers(response.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (searchValue) {
      const filteredData = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredContacts(filteredData);
    } else {
      setFilteredContacts(users);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <center>
          <h1>Employees List</h1>
          <input
            type="text"
            onChange={handleSearch}
            value={searchValue}
            placeholder="Search Employee"
          />
        </center>
        <table>
          {filteredContacts.map((contact) => (
            <tr>
              <td>
                <Link to={`employee/${contact.numericCode}`}>
                  <p>{contact.employeeName}</p>
                </Link>
              </td>
            </tr>
          ))}
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tr>
              <td>
                <Link to={`employee/${user.numericCode}`}>
                  {user.employeeName}
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
};
export default Employee;
