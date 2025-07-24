import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/sync_logo.png";
import fondo from "../img/sync_fondo_paginas.png";

const Test = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);

  const handleLogout = () => {
    fetch("https://servidor-sync.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => navigate("/login"));
  };
  


  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await fetch("https://servidor-sync.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const authData = await authRes.json();
  
        if (!authData.isAuthenticated) {
          setError("Sesión expirada. Redirigiendo...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }
  
        setUserName(authData.userName);
  
        // 🚨 Nuevo paso: comprobar si ya ha hecho el test
        const realizadoRes = await fetch("https://servidor-sync.onrender.com/test-realizado", {
          method: "GET",
          credentials: "include",
        });
        const realizadoData = await realizadoRes.json();
        if (realizadoData.realizado) {
          navigate("/test-completado");
          return;
        }
  
        // Si no lo ha hecho, cargar preguntas
        const pregRes = await fetch("https://servidor-sync.onrender.com/preguntas", {
          method: "GET",
          credentials: "include",
        });
  
        if (!pregRes.ok) throw new Error("Error al cargar preguntas");
  
        const data = await pregRes.json();
        setPreguntas(data);
        setRespuestas(new Array(data.length).fill(null));
      } catch (err) {
        setError("Error al cargar el test");
        console.error(err);
      }
    };
  
    init();
  }, [navigate]);
  

  const handleRespuesta = (indexPregunta, indiceOpcion) => {
    const nuevas = [...respuestas];
    nuevas[indexPregunta] = indiceOpcion;
    setRespuestas(nuevas);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (respuestas.includes(null)) {
      setError("Responde todas las preguntas antes de enviar.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("https://servidor-sync.onrender.com/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ respuestas }),
      });

      if (!res.ok) throw new Error("Error al enviar respuestas");

      navigate("/test-completado");
    } catch (err) {
      setError("Error al enviar el test");
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pagina-test min-h-screen p-8 relative">
      
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "10px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-50"
        onClick={handleLogout}>Cerrar sesión</button>

      {/* Logo */}
      <div className="w-full flex justify-start ml-6 mt-4 z-10 relative">
        <Link to="/principal">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] h-auto cursor-pointer"
          />
        </Link>
      </div>

      <h1 className=" text-4xl font-bold text-center">Sync...ronizando</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

  {/* Mostrar solo si hay preguntas cargadas */}
  {preguntas.length > 0 && (
    <div className="cajapreguntas p-6">
      <p className="text-lg font-semibold text-[#333] mb-4">
        Pregunta {preguntaActual + 1} de {preguntas.length}
      </p>
      <p className="titulopreguntatest mb-4 text-black">{preguntas[preguntaActual].texto}</p>

      <div className="opcionestest flex flex-col gap-3">
        {preguntas[preguntaActual].opciones.map((op, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={`pregunta-${preguntaActual}`}
              value={i}
              checked={respuestas[preguntaActual] === i}
              onChange={() => handleRespuesta(preguntaActual, i)}
              className="form-radio text-[#0395ff] h-5 w-5"
            />
            <span className="text-black">{op}</span>
          </label>
        ))}
      </div>
    </div>
  )}

  {/* Navegación entre preguntas */}
  <div className="botones-avanzar flex justify-between mt-6">
    <button
      type="button"
      onClick={() => setPreguntaActual(p => Math.max(p - 1, 0))}
      className="bg-[#ceef32] hover:bg-[#b4c952]"
      disabled={preguntaActual === 0}
    >
      <p>Anterior</p>
    </button>

    {preguntaActual < preguntas.length - 1 ? (
      <button
        type="button"
        onClick={() => setPreguntaActual(p => p + 1)}
        disabled={respuestas[preguntaActual] == null}
        className="bg-[#0395ff] hover:bg-[#74b5e4] "
      >
        <p>Siguiente</p>
      </button>
    ) : (
      <button
        type="submit"
        disabled={respuestas.includes(null) || enviando}
        className="bg-[#ff78e5] hover:bg-[#d465bf]"
      >
        {enviando ? "Enviando..." : "Enviar respuestas"}
      </button>
    )}
  </div>
</form>
    </div>
  );
};

export default Test;
