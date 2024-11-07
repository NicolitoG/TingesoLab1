import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const navigate = useNavigate();

  const goToClientSection = () => {
    navigate('/client');
  };

  const goToExecutiveSection = () => {
    navigate('/placeholder');
  }

  return (
    <div>
      <h1>PrestaBanco sección de crédito hipotecario</h1>
      <p>
        Bienvenido a PrestaBanco ingrese como cliente para simular un credito hipotecario
        o como ejecutivo para revisar los creditos hipotecarios pendientes.
      </p>
      <p>
        <button onClick={goToClientSection}>Cliente</button>
        <button onClick={goToExecutiveSection}>Ejecutivo</button>
      </p>
    </div>
    
  );
};

export default Home;
