import React, { useState, useEffect}  from 'react';

import { useParams } from 'react-router-dom';

const User = props  => {
    const { id } = useParams();
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [user, setUser] = useState([]);

useEffect(() => {
    fetch("http://192.168.1.3:8081/api/logs/usersv3/" + id)
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data);
                setUser(data);
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

if (user) {
    return (
        <div>
            <h1>User ID : {user.userid}</h1>
            <div>
                Date: {user.localdate}
            </div>
            <div>
                First In Time: {user.firstintime}
            </div>
            <div>
                Last Out Time: {user.lastouttime}
            </div>
            <div>
                Productive Time: {user.productivetime}
            </div> 
            <div>
                Non Productive Time: {user.nonproductivetime}
            </div>            
        </div>
    );
}
}
export default User;