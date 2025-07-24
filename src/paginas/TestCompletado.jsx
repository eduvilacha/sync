import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="pagina-TestCompleto min-h-screen relative flex flex-col items-center justify-center p-6 text-center">
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "50px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-50"
        onClick={handleLogout}
      >Cerrar sesión</button>

      {/* Logo (arriba izquierda) */}
      <div style={{ position: "absolute", top: "25px", left: "50px" }} className="z-50">
        <img
          src={logo}
          alt="Logo"
          className="w-[120px] h-auto cursor-pointer"
          onClick={() => navigate("/principal")}
        />
      </div>

      {/* Mensaje principal */}
      <div className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-xl max-w-xl">
        <h1 className="text-3xl font-bold mb-4">
          ¡Ya has completado el test!
        </h1>
        <p className="text-lg text-[#333]">
          Puedes consultar tus compatibilidades en la sección <strong>Top 5</strong> o seguir explorando la app.
        </p>

        <button
        onClick={() => navigate("/top5")}
        className="mt-6 py-[10px] px-[30px] text-[#ffffff] bg-[#0395ff] hover:bg-[#0277cc] border-none rounded transition"
         > <p>Ver Top 5</p></button>

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
