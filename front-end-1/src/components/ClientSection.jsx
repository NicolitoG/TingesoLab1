import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ClientSection = () => {

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/client/register');
  };

  const goToLogin = () => {
    navigate('/client/login');
  }

  return (
    <div>
      <h1>Seccion cliente</h1>
      <p>
        inicie sesion para utilizar las funcionalidades de PrestaBanco
        si no tiene una cuenta puede Registrarse
      </p>
      <p>
        <button onClick={goToLogin}>Iniciar sesion</button>
        <button onClick={goToRegister}>Registrarse</button>
      </p>
    </div>
    
  );
};

export default ClientSection;
