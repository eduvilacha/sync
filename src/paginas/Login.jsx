import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/sync_logo.png";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Iniciando login con usuario:", usuario);
    try {
      const res = await fetch("https://servidor-sync.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: usuario,
          contrasena: contraseña,
        }),
        credentials: "include",
      });

      console.log("Estado de respuesta /login:", res.status);
      console.log("Cabeceras de respuesta /login:", res.headers.get("Set-Cookie"));
      const data = await res.json();
      console.log("Respuesta de /login:", data);

      if (res.ok && data.success) {
        console.log("Login exitoso, esperando para verificar sesión...");
      
        // AÑADIR. Esperar para que el navegador guarde bien la cookie
        await new Promise(resolve => setTimeout(resolve, 300));
      
        const authCheck = await fetch("https://servidor-sync.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const authData = await authCheck.json();
        console.log("Respuesta de /check-auth después de login:", authData);

        
        if (authData.isAuthenticated) {
          console.log("Sesión verificada, redirigiendo a /principal");
          navigate("/principal");
        } else {
          console.error("Sesión no establecida después del login");
          setError("Error: No se pudo establecer la sesión. Intenta de nuevo.");
        }
      } else {
        console.log("Error en login:", data.message);
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al conectar con el servidor. Verifica tu conexión.");
    }
  };

  return (
    <div className="login login-background">
      <div className="flex flex-col items-start justify-start mt-[100px] ml-[20px]">
        <img src={logo} alt="Logo" className="max-w-[150px] h-auto mb-[4px]" />
        <h1 className="text-white text-lg leading-tight mb-[10px]">
          Iniciar sesión
        </h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="formulario flex flex-col gap-4 sm:items-center"
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none"
            required 
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="login-text w-[500px] h-[30px] px-4 text-lg border-0 border-b-2 border-white bg-transparent text-white outline-none mt-[10px]"
            required 
          />
          <button
            type="submit"
            className="boton w-[100px] h-[40px] bg-[#0395ff] text-white rounded-full text-xl hover:bg-[#0277cc] transition-all border-none flex items-center justify-center mt-[10px]"
          >
            Entrar
          </button>
          <Link
            to="/registro"
            className="link-registrate w-[300px] h-[50px] text-[#000000] hover:text-[#ceef32] text-xl border-none flex items-center justify-start"
          >
            ¿No tienes cuenta?, Regístrate
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;