import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");
  const [provincia, setProvincia] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://servidor-sync.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad,
          genero,
          provincia,
          contrasena,
        }),
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Error al registrarse. Por favor, intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error al registrarse:", err);
      alert("Error al registrarse. Verifica tu conexión.");
    }
  };

  return (
    <div className="login login-background">
      {/* Contenedor logo, título y formulario */}
      <div className="flex flex-col items-start justify-start mt-[100px] ml-[20px]">
        {/* Logo */}
        <img src={logo} alt="Logo" className="max-w-[150px] h-auto mb-[4px]" />

        {/* Título */}
        <h1 className="text-white text-lg leading-tight mb-[10px]">
          Registrarse
        </h1>

        {/* Formulario */}
        <form
          onSubmit={handleRegister}
          className="formulario flex flex-col gap-4 sm:items-center"
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none"
            required
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none mt-[10px]"
            required
          />
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none mt-[10px]"
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
            <option value="O">Otro</option>
          </select>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none mt-[10px]"
            required
          >
            <option value="">Selecciona tu provincia</option>
            <option value="A Coruña">A Coruña</option>
            <option value="Álava">Álava</option>
            <option value="Albacete">Albacete</option>
            <option value="Alicante">Alicante</option>
            <option value="Almería">Almería</option>
            <option value="Asturias">Asturias</option>
            <option value="Ávila">Ávila</option>
            <option value="Badajoz">Badajoz</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Burgos">Burgos</option>
            <option value="Cáceres">Cáceres</option>
            <option value="Cádiz">Cádiz</option>
            <option value="Cantabria">Cantabria</option>
            <option value="Castellón">Castellón</option>
            <option value="Ciudad Real">Ciudad Real</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Cuenca">Cuenca</option>
            <option value="Gerona">Gerona</option>
            <option value="Granada">Granada</option>
            <option value="Guadalajara">Guadalajara</option>
            <option value="Gipuzkoa">Gipuzkoa</option>
            <option value="Huelva">Huelva</option>
            <option value="Huesca">Huesca</option>
            <option value="Islas Baleares">Islas Baleares</option>
            <option value="Jaén">Jaén</option>
            <option value="La Rioja">La Rioja</option>
            <option value="Las Palmas">Las Palmas</option>
            <option value="León">León</option>
            <option value="Lleida">Lleida</option>
            <option value="Lugo">Lugo</option>
            <option value="Madrid">Madrid</option>
            <option value="Málaga">Málaga</option>
            <option value="Murcia">Murcia</option>
            <option value="Navarra">Navarra</option>
            <option value="Ourense">Ourense</option>
            <option value="Palencia">Palencia</option>
            <option value="Pontevedra">Pontevedra</option>
            <option value="Salamanca">Salamanca</option>
            <option value="Segovia">Segovia</option>
            <option value="Sevilla">Sevilla</option>
            <option value="Soria">Soria</option>
            <option value="Tarragona">Tarragona</option>
            <option value="Teruel">Teruel</option>
            <option value="Toledo">Toledo</option>
            <option value="Valencia">Valencia</option>
            <option value="Valladolid">Valladolid</option>
            <option value="Vizcaya">Vizcaya</option>
            <option value="Zamora">Zamora</option>
            <option value="Zaragoza">Zaragoza</option>
          </select>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none mt-[10px]"
            required
          />

          {/* Botón de enviar */}
          <button
            type="submit"
            className="boton w-[100px] h-[40px] bg-[#0395ff] text-white rounded-full text-xl hover:bg-[#0277cc] transition-all border-none flex items-center justify-center mt-[10px]"
          >
            Registrarse
          </button>

          {/* Enlace a login */}
          <Link
            to="/login"
            className="link-registrate w-[300px] h-[50px] text-[#000000] hover:text-[#ceef32] text-xl border-none flex items-center justify-start"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;