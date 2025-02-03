//src\components\Folder.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineFolderOpen, AiOutlineMail, AiOutlineLoading3Quarters, AiOutlineExclamationCircle, AiOutlineDelete } from "react-icons/ai";
import { FaTag } from "react-icons/fa";

const Folder = ({ folderName }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get(`/api/folders/${folderName}/emails`);
                setEmails(response.data);
            } catch (err) {
                setError("Error loading emails");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [folderName]);

    // Manejar selección de correos
    const handleSelectEmail = (id) => {
        setSelectedEmails((prev) =>
            prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]
        );
    };

    // Eliminar correos seleccionados
    const handleDeleteEmails = () => {
        const newEmails = emails.filter((email) => !selectedEmails.includes(email.id));
        setEmails(newEmails);
        setSelectedEmails([]);
    };

    return (
        <div className="folder-container">
            <h2 className="folder-title">
                <AiOutlineFolderOpen className="folder-icon" /> {folderName}
            </h2>

            {loading ? (
                <p className="loading">
                    <AiOutlineLoading3Quarters className="icon-spin" /> Loading emails...
                </p>
            ) : error ? (
                <p className="error">
                    <AiOutlineExclamationCircle className="error-icon" /> {error}
                </p>
            ) : (
                <>
                    {/* Botones de acción */}
                    {selectedEmails.length > 0 && (
                        <div className="email-actions">
                            <button onClick={handleDeleteEmails} className="delete-btn">
                                <AiOutlineDelete /> Delete
                            </button>
                            <button className="category-btn">
                                <FaTag /> Categorize
                            </button>
                        </div>
                    )}

                    <ul className="email-list">
                        {emails.length === 0 ? (
                            <li className="email-empty">
                                <AiOutlineExclamationCircle /> No emails found
                            </li>
                        ) : (
                            emails.map((email) => (
                                <li key={email.id} className="email-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedEmails.includes(email.id)}
                                        onChange={() => handleSelectEmail(email.id)}
                                    />
                                    <AiOutlineMail className="email-icon" />
                                    <div className="email-content">
                                        <strong>{email.subject}</strong> - {email.sender}
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Folder;
