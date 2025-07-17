import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";
import fondo from "../img/sync_fondo_paginas.png";

const TestCompletado = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("https://servidor-sync.onrender.com/logout", {
        method: "GET",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center">
      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-10 py-2 px-4 text-white bg-[#ff2d01] hover:bg-[#ff78e5] rounded z-50"
      >
        Cerrar sesión
      </button>

      {/* Logo con link hacia principal */}
      <div className="absolute top-5 left-6">
        <img
          src={logo}
          alt="Logo"
          className="w-[120px] h-auto cursor-pointer"
          onClick={() => navigate("/principal")}
        />
      </div>

      {/* Mensaje principal */}
      <div className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-xl max-w-xl">
        <h1 className="text-3xl font-bold text-[#0395ff] mb-4">
          ¡Ya has completado el test!
        </h1>
        <p className="text-lg text-[#333]">
          Puedes consultar tus compatibilidades en la sección <strong>Top 5</strong> o seguir explorando la app.
        </p>
      </div>

      {/* Fondo decorativo */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
        }}
      />
    </div>
  );
};

export default TestCompletado;
