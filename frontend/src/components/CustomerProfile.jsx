import {Route, Routes, Link} from "react-router-dom";
import { useState, useEffect } from "react";


const CustomerProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  
    if (!user) {
      return <h2>Please register first</h2>;
    }
  
    return (
      <div>
        <h2>Customer Profile</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    );

}

export default CustomerProfile;