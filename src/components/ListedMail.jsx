// src/components/ListedMail.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import "../styles/ListedMail.css";

const ListedMail = ({ mail, folderType, onSelect }) => {
  // Función para renderizar los destinatarios según la carpeta
  const renderRecipients = () => {
    if (folderType === "sent") {
      return (
        <>
          <div className="mail-recipient">{mail.to}</div>
          <div className="mail-cco">{mail.cco || "N/A"}</div>
        </>
      );
    }

    if (folderType === "inbox") {
      return <div className="mail-recipient">{mail.to}</div>;
    }

    // Si la carpeta es "other", solo mostramos remitente, asunto y fecha
    return null;
  };

  return (
    <div className="listed-mail">
      <input
        type="checkbox"
        className="mail-checkbox"
        onChange={() => onSelect(mail.id)}
      />
      <div className="mail-icon">
        {mail.opened ? <FaRegEnvelopeOpen /> : <FaRegEnvelope />}
      </div>
      <div className="mail-sender">{folderType === "sent" ? "Tú" : mail.sender}</div>
      <div className="mail-subject">{mail.subject}</div>
      <div className="mail-date">{mail.date}</div>

      {renderRecipients()}
    </div>
  );
};

ListedMail.propTypes = {
  mail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    cco: PropTypes.string,
    opened: PropTypes.bool,
  }).isRequired,
  folderType: PropTypes.oneOf(["sent", "inbox", "other"]).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ListedMail;
