import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";
import imgPerfil from "../img/sync_perfil.png";
import imgTest from "../img/sync_test.png";
import imgCompatibilidad from "../img/sync_comparativa.png";
import imgFondoBajo from "../img/sync_fondo_paginas.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch('https://servidor-sync.onrender.com/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
        setError('No se pudo cerrar sesión. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud de logout:', error);
      setError('Error en la solicitud. Verifica tu conexión.');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://servidor-sync.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!data.isAuthenticated) {
          setError("Sesión no válida. Redirigiendo al login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setUserName(data.userName);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setError("Error al verificar autenticación. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="pagina-principal h-screen overflow-hidden relative p-0 m-0">
      {/* Botón de cerrar sesión */}
      <button
        style={{ position: 'absolute', top: '25px', right: '50px' }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-10"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>

      <div className="w-full flex ml-[5%]">
        <img 
          src={logo} 
          alt="Logo" 
          className="max-w-[150px] h-auto" 
        />
      </div>

      <div className="w-full flex justify-center">
        <h1 className="font-bold text-center mb-2">¡Hola, {userName}!</h1>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="flex h-[50%] justify-evenly items-center">
        <a href="/test" className="group" style={{ width: '20%' }}>
          <div className="bg-blue-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img 
              src={imgTest} 
              alt="Test" 
              className="w-[100%] m-4 transition-transform group-hover:scale-110 object-contain" 
            />
            <p className="textoOpciones text-center">Test</p>
          </div>
        </a>

        <a href="/top5" className="group" style={{ width: '20%' }}>
          <div className="bg-green-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img 
              src={imgCompatibilidad} 
              alt="Compatibilidad" 
              className="w-[100%] mb-2 transition-transform group-hover:scale-110 object-contain" 
            />
            <p className="textoOpciones text-center">Compatibilidad</p>
          </div>
        </a>

        <a href="/perfil" className="group" style={{ width: '20%' }}>
          <div className="bg-orange-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img 
              src={imgPerfil} 
              alt="Perfil" 
              className="w-[100%] mb-2 transition-transform group-hover:scale-110 object-contain" 
            />
            <p className="textoOpciones no-underline text-center">Perfil</p>
          </div>
        </a>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${imgFondoBajo})`,
          backgroundPosition: 'bottom',
          backgroundAttachment: "fixed",
        }}
      />
    </div>
  );
};

export default MainPage;
  