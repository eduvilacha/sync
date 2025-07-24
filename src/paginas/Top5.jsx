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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8 relative">
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "50px" }}
        className="py-[10px] px-[20px] text-white bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-50"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
  
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
  
      <h1 className="text-3xl font-bold text-center text-[#0395ff] mt-20 mb-12">
        💘 Tus 5 Compatibilidades Principales
      </h1>
  
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      {/* Caja que alinea horizontalmente los elementos */}
      <div className="flex justify-center gap-6 overflow-x-auto px-4">
        {compatibles.map((item, i) => (
          <div
            key={i}
            className="min-w-[200px] bg-white rounded-2xl shadow-md p-6 text-center space-y-3 border-l-4 border-[#0395ff] flex-shrink-0"
          >
            <h2 className="text-lg font-semibold text-[#333]">
              {item.usuario.nombre}
            </h2>
            <p className="text-sm text-gray-500">
              {item.usuario.edad || "Edad no disponible"}
            </p>
  
            {/* Gráfico circular de compatibilidad */}
            <div className="relative w-24 h-24 mx-auto">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#0395ff ${item.porcentaje * 3.6}deg, #e5e7eb 0deg)`,
                }}
              ></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center text-[#0395ff] font-bold text-lg">
                {item.porcentaje}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Top5;
