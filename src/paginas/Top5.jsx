import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/sync_logo.png";

const Top5 = () => {
  const navigate = useNavigate();
  const [compatibles, setCompatibles] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => {
    fetch("https://servidor-sync.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => navigate("/login"));
  };
  

  useEffect(() => {
    const fetchTop5 = async () => {
      try {
        const res = await fetch("https://servidor-sync.onrender.com/top5", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Error al cargar top5");

        const data = await res.json();
        setCompatibles(data);
      } catch (err) {
        setError("No se pudo cargar la compatibilidad.");
        console.error(err);
      }
    };

    fetchTop5();
  }, []);

  return (
    <div className="pagina-top5 min-h-screen bg-gradient-to-b from-blue-100 to-white p-8 relative overflow-x-hidden">
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "50px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-50"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
  
      {/* Logo */}
      <div className="absolute top-5 left-6 z-10">
        <Link to="/principal">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] h-auto cursor-pointer"
          />
        </Link>
      </div>
  
      <h1 className="text-3xl font-bold text-center text-[#0395ff]">
        Tus 5 Compatibilidades Principales
      </h1>
  
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      {/* Contenedor horizontal */}
      <div className="flex justify-center flex-wrap gap-6 max-w-5xl mx-auto">
        {compatibles.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center space-y-3 w-60 border-l-4 border-[#0395ff]"
          >
            <h2 className="text-lg font-semibold text-[#333]">
              {item.usuario.nombre}
            </h2>
            <p className="text-sm text-gray-500">
              {item.usuario.edad || "Edad no disponible"}
            </p>
  
            {/* Gráfico circular */}
            <div className="flex flex-col items-center space-y-2">
              <svg className="circular-chart" width="80" height="80">
                <circle
                  className="circle-bg"
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#e6e6e6"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="circle"
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#0395ff"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(item.porcentaje / 100) * 220},220`}
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[#0395ff] font-semibold">{item.porcentaje}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Top5;
