//src\components\SideBar.jsx
import React, { useState } from "react";
import { FaPlus, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from "react-icons/fa";
import "../styles/SideBar.css";

const SideBar = ({ onSelectFolder }) => {
  const [openFolders, setOpenFolders] = useState({
    carpeta: true,
    categoria: true,
  });

  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  return (
    <div className="sidebar">
      <button className="compose-btn">
        <FaPlus /> Redactar
      </button>

      <div className="folder-section">
        <div className="folder-header" onClick={() => toggleFolder("carpeta")}>
          {openFolders.carpeta ? <FaChevronDown /> : <FaChevronRight />} CARPETA
        </div>
        {openFolders.carpeta && (
          <ul>
            <li onClick={() => onSelectFolder("Recibidos")}>
              <FaFolder /> Recibidos
            </li>
            <li onClick={() => onSelectFolder("Enviados")}>
              <FaFolder /> Enviados
            </li>
            <li onClick={() => onSelectFolder("Borrador")}>
              <FaFolder /> Borrador
            </li>
          </ul>
        )}
      </div>

      <div className="folder-section">
        <div className="folder-header" onClick={() => toggleFolder("categoria")}>
          {openFolders.categoria ? <FaChevronDown /> : <FaChevronRight />} CATEGORÍA
        </div>
        {openFolders.categoria && (
          <ul>
            <li onClick={() => onSelectFolder("Principal")}>
              <FaFolderOpen /> Principal
            </li>
            <li onClick={() => onSelectFolder("Promoción")}>
              <FaFolderOpen /> Promoción
            </li>
            <li onClick={() => onSelectFolder("Social")}>
              <FaFolderOpen /> Social
            </li>
            <li onClick={() => onSelectFolder("Notificación")}>
              <FaFolderOpen /> Notificación
            </li>
            <li onClick={() => onSelectFolder("Foro")}>
              <FaFolderOpen /> Foro
            </li>
            <li onClick={() => onSelectFolder("Importante")}>
              <FaFolderOpen /> Importante
            </li>
            <li onClick={() => onSelectFolder("Spam")}>
              <FaFolderOpen /> Spam
            </li>
            <li onClick={() => onSelectFolder("Papelera")}>
              <FaFolderOpen /> Papelera
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
