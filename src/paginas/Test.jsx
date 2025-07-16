import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";
import fondo from "../img/sync_fondo_paginas.png";

const Test = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

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

      navigate("/top5");
    } catch (err) {
      setError("Error al enviar el test");
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pagina-test min-h-screen p-8 relative">
      <button
        onClick={() => {
          fetch("https://servidor-sync.onrender.com/logout", {
            method: "GET",
            credentials: "include",
          }).then(() => navigate("/login"));
        }}
        className="absolute top-5 right-10 py-2 px-4 text-white bg-[#ff2d01] hover:bg-[#ff78e5] rounded"
      >
        Cerrar sesión
      </button>

      <div className="mb-6 flex items-center">
        <img src={logo} alt="Logo" className="w-[120px] mr-4" />
        <h1 className="text-white text-3xl font-bold">Test de Compatibilidad</h1>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {preguntas.map((pregunta, index) => (
          <div key={index} className="bg-white rounded p-4 shadow">
            <p className="font-semibold mb-2 text-black">{pregunta.texto}</p>
            <div className="flex gap-4">
            {pregunta.opciones.map((op, i) => (
                <label key={i} className="text-black">
                  <input
                    type="radio"
                    name={`pregunta-${index}`}
                    value={i}
                    checked={respuestas[index] === i}
                    onChange={() => handleRespuesta(index, i)}
                    className="mr-2"
                  />
                  {op}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#0395ff] text-white text-xl px-6 py-2 rounded hover:bg-[#0277cc] disabled:opacity-50"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar respuestas"}
        </button>
      </form>

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

export default Test;
