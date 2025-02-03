//src\components\NavBar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "../styles/NavBar.css";

const NavBar = () => {
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    axios
      .get("/api/user") // Ajusta la URL según tu backend
      .then((response) => {
        if (response.data && response.data.name) {
          setUserName(response.data.name);
        }
      })
      .catch((error) => {
        console.error("Error obteniendo el usuario:", error);
      });
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>BD.edu.co</h1>
      </div>
      <div className="navbar-right">
        <span className="datetime">
          {formatDate(currentTime)} | {formatTime(currentTime)}
        </span>
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span>{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

