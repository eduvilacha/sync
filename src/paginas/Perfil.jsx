import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/sync_logo.png";
import imgFondoBajo from "../img/sync_fondo_paginas.png";

const Perfil = () => {
  console.log("PERFIL CARGADO");
  const [user, setUser] = useState({
    nombre: "",
    edad: "",
    genero: "",
    provincia: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const provincias = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
    "Gerona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga",
    "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife",
    "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid",
    "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla"
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Enviando solicitud a /perfil");
        const response = await fetch("https://servidor-sync.onrender.com/perfil", {
          method: "GET",
          credentials: "include",
        });

        console.log("Estado de respuesta /perfil:", response.status);
        const data = await response.json();
        console.log("Respuesta de /perfil:", data);

        if (!response.ok) {
          if (response.status === 401) {
            console.log("No autorizado en /perfil, redirigiendo a /login");
            setError("Sesión no válida. Redirigiendo al login...");
            setTimeout(() => navigate("/login"), 2000);
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (data.success) {
          setUser({
            nombre: data.nombre || "",
            edad: data.edad || "",
            genero: data.genero || "",
            provincia: data.provincia || "",
          });
        } else {
          setError(data.message || "Error al cargar el perfil");
        }
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        setError("Error al conectar con el servidor. Verifica tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const updateData = {};
    if (user.provincia) updateData.provincia = user.provincia;
    if (newPassword) updateData.contrasena = newPassword;

    try {
      console.log("Enviando POST a /perfil con datos:", updateData);
      const response = await fetch("https://servidor-sync.onrender.com/perfil", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("Estado de respuesta POST /perfil:", response.status);
      const data = await response.json();
      console.log("Respuesta de POST /perfil:", data);

      if (!response.ok) {
        if (response.status === 401) {
          console.log("No autorizado en POST /perfil, redirigiendo a /login");
          setError("Sesión no válida. Redirigiendo al login...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (data.success) {
        console.log("Perfil actualizado correctamente");
        alert("Perfil actualizado correctamente");
        setNewPassword("");
      } else {
        setError(data.message || "Error al actualizar el perfil");
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setError("Error al conectar con el servidor. Verifica tu conexión.");
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Enviando solicitud a /logout");
      const response = await fetch("https://servidor-sync.onrender.com/logout", {
        method: "GET",
        credentials: "include",
      });

      console.log("Estado de respuesta /logout:", response.status);
      const data = await response.json();
      console.log("Respuesta de /logout:", data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (data.success) {
        console.log("Logout exitoso, redirigiendo a /login");
        navigate("/login");
      } else {
        setError(data.message || "Error al cerrar sesión");
      }
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError("Error al conectar con el servidor. Verifica tu conexión.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }


  
  return (
    <div className="pagina-perfil min-h-screen relative overflow-hidden">
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
  
      {/* Botón cerrar sesión */}
      <button
        style={{ position: "absolute", top: "25px", right: "50px" }}
        className="py-[10px] px-[20px] text-[#ffffff] bg-[#ff2d01] hover:bg-[#ff78e5] border-none transition z-10"
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
  
      {/* Contenedor principal */}
      <div className="miperfil-contenido font-['Roboto']">
        <h1 className="text-4xl font-bold text-center">Tu perfil</h1>
  
        <form onSubmit={handleSubmit} className="flex flex-col text-xl space-y-[2px]">
          <div><p><strong>Nombre:</strong> {user.nombre || "No disponible"}</p></div>
          <div><p><strong>Edad:</strong> {user.edad || "No disponible"}</p></div>
          <div><p><strong>Género:</strong> {user.genero || "No disponible"}</p></div>

          <div>
            <label htmlFor="provincia" className="block font-semibold">
              <p><strong>Provincia:</strong></p>
            </label>
            <select
              name="provincia"
              value={user.provincia}
              onChange={(e) => setUser({ ...user, provincia: e.target.value })}
              className="w-[40%] h-[40px] border border-gray-300 px-3 py-1 rounded text-base"
              required
            >
              {provincias.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contrasena" className="block font-semibold">
              <p><strong>Nueva contraseña:</strong></p>
            </label>
            <input
              type="password"
              name="contrasena"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-[40%] h-[40px] border border-gray-300 px-3 py-1 rounded text-base"
            />
          </div>
        </form>
        <button
          type="submit"
          form="perfil-formulario"
          className="w-[40%] h-[40px] bg-[#0395ff] hover:bg-[#0277cc] text-white font-semibold px-4 mt-5 rounded transition"
        >
          Actualizar
        </button>
          
        <Link to="/principal" className="text-blue-500 hover:underline mt-6 block text-center text-lg">
          Volver al inicio
        </Link>
      </div>
  
      {/* Fondo decorativo */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${imgFondoBajo})`,
          backgroundPosition: "bottom",
        }}
      />
    </div>
  );  
};

export default Perfil;