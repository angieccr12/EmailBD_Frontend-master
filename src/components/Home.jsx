import React, { useState } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Folder from "./Folder";
import NewEmail from "./NewEmail";

import "../styles/Home.css";

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState("Recibidos");

  const folderOptions = ['Recibidos', 'Enviados', 'Borrador', 'Principal', 'Promoción', 'Social', 'Notificación'];

  return (
    <div className="home-container">
      <NavBar />
      <div className="home-content">
        <SideBar onSelectFolder={setSelectedFolder} />
        <div className="section-container">
          {selectedFolder === "Redactar" && <NewEmail />}
          {folderOptions.includes(selectedFolder) && <Folder />}
        </div>
      </div>
    </div>
  );
};

export default Home;
