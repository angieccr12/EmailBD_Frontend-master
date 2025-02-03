import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSend, AiOutlineUser, AiOutlinePaperClip, AiOutlineClose } from 'react-icons/ai';
import '../styles/NewEmail.css';
import SideBar from './SideBar';
import NavBar from './NavBar';

const NewEmail = () => {
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [adjuntos, setAdjuntos] = useState([]);
    const [opcion, setOpcion] = useState('Enviar');
    const [destinatariosCC, setDestinatariosCC] = useState([]);
    const [destinatariosCCO, setDestinatariosCCO] = useState([]);
    const [newDestinatarioCC, setNewDestinatarioCC] = useState('');
    const [newDestinatarioCCO, setNewDestinatarioCCO] = useState('');

    useEffect(() => {
        const fetchDestinatarios = async () => {
            try {
                const response = await axios.get('/api/obtenerDestinatarios');
                if (Array.isArray(response.data)) {
                    setDestinatariosCC(response.data);
                } else {
                    console.error("La API no devolvió un array:", response.data);
                }
            } catch (error) {
                console.error('Error en la API:', error);
            }
        };
        fetchDestinatarios();
    }, []);

    const manejarAdjuntos = (event) => {
        const archivos = Array.from(event.target.files);
        setAdjuntos([...adjuntos, ...archivos]);
    };

    const agregarDestinatario = (tipo) => {
        if (tipo === 'cc' && newDestinatarioCC) {
            if (!destinatariosCC.includes(newDestinatarioCC)) {
                setDestinatariosCC([...destinatariosCC, newDestinatarioCC]);
            }
            setNewDestinatarioCC('');
        } else if (tipo === 'cco' && newDestinatarioCCO) {
            if (!destinatariosCCO.includes(newDestinatarioCCO)) {
                setDestinatariosCCO([...destinatariosCCO, newDestinatarioCCO]);
            }
            setNewDestinatarioCCO('');
        }
    };

    const eliminarDestinatario = (destinatario, tipo) => {
        if (tipo === 'cc') {
            setDestinatariosCC(destinatariosCC.filter(item => item !== destinatario));
        } else {
            setDestinatariosCCO(destinatariosCCO.filter(item => item !== destinatario));
        }
    };

    const enviarCorreo = async () => {
        const datosCorreo = {
            cc: destinatariosCC.join(', '),
            cco: destinatariosCCO.join(', '),
            asunto,
            mensaje,
            adjuntos: adjuntos.map(file => file.name),
            opcion
        };

        try {
            await axios.post('/api/enviarCorreo', datosCorreo);
            console.log('Correo enviado:', datosCorreo);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

    return (
        <div className="layout">
            <SideBar />
            <div className="content">
                <NavBar />
                <div className="new-email">
                    <div className="btn-group">
                        <button className={`btn-opcion ${opcion === 'Enviar' ? 'active' : ''}`} onClick={() => setOpcion('Enviar')}>
                            Enviar <AiOutlineSend />
                        </button>
                        <button className={`btn-opcion ${opcion === 'Responder' ? 'active' : ''}`} onClick={() => setOpcion('Responder')} disabled>
                            <AiOutlineUser size={16} /> Responder
                        </button>
                        <button className={`btn-opcion ${opcion === 'Reenviar' ? 'active' : ''}`} onClick={() => setOpcion('Reenviar')} disabled>
                            <AiOutlinePaperClip size={16} /> Reenviar
                        </button>
                    </div>

                    <div className="email-fields">
                        <div className="field-group">
                            <button className="btn-label"><AiOutlineUser /> CC</button>
                            <input
                                type="text"
                                placeholder="Destinatario(s)"
                                value={newDestinatarioCC}
                                onChange={(e) => setNewDestinatarioCC(e.target.value)}
                            />
                            <button onClick={() => agregarDestinatario('cc')}>Agregar</button>
                            <div className="destinatarios-list">
                                {destinatariosCC.map((destinatario, index) => (
                                    <div key={index} className="destinatario-item">
                                        <span>{destinatario}</span>
                                        <AiOutlineClose onClick={() => eliminarDestinatario(destinatario, 'cc')} className="icon-delete" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="field-group">
                            <button className="btn-label"><AiOutlineUser /> CCO</button>
                            <input
                                type="text"
                                placeholder="Destinatarios adjuntos"
                                value={newDestinatarioCCO}
                                onChange={(e) => setNewDestinatarioCCO(e.target.value)}
                            />
                            <button onClick={() => agregarDestinatario('cco')}>Agregar</button>
                            <div className="destinatarios-list">
                                {destinatariosCCO.map((destinatario, index) => (
                                    <div key={index} className="destinatario-item">
                                        <span>{destinatario}</span>
                                        <AiOutlineClose onClick={() => eliminarDestinatario(destinatario, 'cco')} className="icon-delete" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        className="input-asunto"
                        placeholder="Agregar un asunto"
                        value={asunto}
                        onChange={(e) => setAsunto(e.target.value)}
                    />

                    <textarea
                        className="input-mensaje"
                        placeholder="Escriba / para insertar archivos y más"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />

                    <div className="adjuntos">
                        <label><AiOutlinePaperClip /> Lista de archivos</label>
                        <input type="file" multiple onChange={manejarAdjuntos} />
                        <ul>
                            {adjuntos.map((archivo, index) => (
                                <li key={index}>{archivo.name}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewEmail;
