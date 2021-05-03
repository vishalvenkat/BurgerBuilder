import React from 'react';
import './Backdrop.css';
const Backdrop = ({show,closeModal}) => (
    show ? <div className="Backdrop" onClick={closeModal}></div> : null
);

export default Backdrop;