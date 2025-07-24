import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";
import imgPerfil from "../img/sync_perfil.png";
import imgTest from "../img/sync_test.png";
import imgCompatibilidad from "../img/sync_comparativa.png";
import Test from "./Test";

const Principal = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://servidor-sync.onrender.com/logout", {
        method: "GET",
        credentials: "include",
      });

      console.log("Estado de respuesta /logout:", response.status);
      const data = await response.json();
      console.log("Respuesta de /logout:", data);

      if (response.ok && data.success) {
        console.log("Logout exitoso, redirigiendo a /login");
        navigate("/login");
      } else {
        console.error("Error al cerrar sesión:", data.message);
        setError("No se pudo cerrar sesión. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud de logout:", error);
      setError("Error al conectar con el servidor. Verifica tu conexión.");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Enviando solicitud a /check-auth");
        const res = await fetch("https://servidor-sync.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });

        console.log("Estado de respuesta /check-auth:", res.status);
        const data = await res.json();
        console.log("Respuesta de /check-auth:", data);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        if (!data.isAuthenticated) {
          console.log("No autenticado, redirigiendo a /login");
          setError("Sesión no válida. Redirigiendo al login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          console.log("Autenticado, nombre de usuario:", data.userName);
          setUserName(data.userName);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setError("Error al verificar autenticación. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="pagina-principal h-screen overflow-hidden relative p-0 m-0">
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <button
        style={{ position: "absolute", top: "25px", right: "10px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-10"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
      <div className="w-full flex ml-[5%]">
        <img src={logo} alt="Logo" className="max-w-[150px] h-auto" />
      </div>
      <div className="w-full flex justify-center">
        <h1 className="font-bold text-center mb-2">¡Hola, {userName}!</h1>
      </div>

      <div className="principal-menu flex h-[50%] justify-evenly items-center">
        
        <Link to="/test" className="group" style={{ width: "20%" }}>
          <div className="bg-blue-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img src={imgTest} alt="Test" className="w-[100%] m-4 transition-transform group-hover:scale-110 object-contain" />
            <p className="textoOpciones text-center">Test</p>
          </div>
        </Link>

        <Link to="/top5" className="group" style={{ width: "20%" }}>
          <div className="bg-green-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img src={imgCompatibilidad} alt="Compatibilidad" className="w-[100%] mb-2 transition-transform group-hover:scale-110 object-contain" />
            <p className="textoOpciones text-center">Compatibilidad</p>
          </div>
        </Link>

        <Link to="/perfil" className="group" style={{ width: "20%" }}>
          <div className="bg-orange-500 text-white rounded-full flex flex-col items-center justify-center w-full h-[120px] transition-transform hover:scale-105">
            <img src={imgPerfil} alt="Perfil" className="w-[100%] mb-2 transition-transform group-hover:scale-110 object-contain" />
            <p className="textoOpciones text-center">Mi Perfil</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Principal;