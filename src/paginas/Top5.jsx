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
  onClick={handleLogout}
  className="absolute top-5 right-10 py-2 px-4 text-white bg-[#ff2d01] hover:bg-[#ff78e5] rounded"
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

      <h1 className="text-3xl font-bold text-center text-[#0395ff] mb-8">💘 Tus 5 Compatibilidades Principales</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {compatibles.map((item, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-[#333]">{item.usuario.nombre}</h2>
            <p className="text-gray-500 text-sm">{item.usuario.provincia}</p>
            <p className="text-2xl font-bold text-[#0395ff] mt-4">{item.porcentaje}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top5;
