import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Folder from "./Folder"; 
import "../styles/Home.css";

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState("Recibidos");

  return (
    <div className="home-container">
      <NavBar />
      <div className="home-content">
        <SideBar onSelectFolder={setSelectedFolder} />
        <div className="content">
          <h2>Carpeta seleccionada: {selectedFolder}</h2>
          <Folder folderName={selectedFolder} /> {/* Mostrar contenido de la carpeta */}
        </div>
      </div>
    </div>
  );
};

export default Home;
