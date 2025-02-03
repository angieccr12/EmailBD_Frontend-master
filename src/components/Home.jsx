import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Folder from "./Folder";
import "../styles/Home.css";

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState("Recibidos");

  useEffect(() => {
    setSelectedFolder("Recibidos");
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      <div className="home-content">
        <SideBar onSelectFolder={setSelectedFolder} />
      </div>
    </div>
  );
};

export default Home;
