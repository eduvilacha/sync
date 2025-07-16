import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Top5 = () => {
  const navigate = useNavigate();
  const [compatibles, setCompatibles] = useState([]);
  const [error, setError] = useState("");

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
