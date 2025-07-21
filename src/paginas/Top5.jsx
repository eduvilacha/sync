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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "50px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-50"
        onClick={handleLogout}
      >Cerrar sesión</button>

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

      <h1 className="text-3xl font-bold text-center text-[#0395ff] mb-8">💘 Tus 5 Compatibilidades Principales</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {compatibles.map((item, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-6 text-center space-y-3">
            <h2 className="text-xl font-semibold text-[#333]">{item.usuario.nombre}</h2>
            <p className="text-gray-500 text-sm">{item.usuario.provincia}</p>

            {/* Porcentaje numérico */}
            <p className="text-lg font-bold text-[#0395ff]">{item.porcentaje}%</p>

            {/* Barra de compatibilidad visual */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden min-w-[100px]">
              <div
                className="h-4 rounded-full bg-[#0395ff] transition-all duration-500"
                style={{ width: `${item.porcentaje}%` }}
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Top5;
