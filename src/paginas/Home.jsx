import React from "react";
import logo from "../img/sync_logo.png";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div  className="home home-background">

      {/* Contenedor logo, slogan y botones */}
      <div className="flex flex-col items-start justify-start mt-[100px] ml-[20px]">

        {/* Logo */}
          <img src={logo} alt="Logo" className="max-w-[150px] h-auto mb-[4px]" />

        {/* Slogan */}
          <h1 className="text-white text-lg leading-tight mb-[10px]">
            Conecta con quien<br />vibra como tú.
          </h1>

        {/* Contenedor de los botones */}
        <div className="botones flex flex-col gap-2 sm:items-center">
          {/* Botón 1 */}
          <Link to="/registro" className="boton w-[500px] h-[50px] bg-[#ceef32] text-white rounded-full text-xl hover:bg-[#b0d82a] transition-all border-none mb-[10px] flex items-center justify-center">
            <h2 className="uppercase">Regístrate</h2>
          </Link>

          {/* Botón 2 */}
          <Link to="/login" className="boton w-[250px] h-[50px] bg-[#0395ff] text-white rounded-full text-xl hover:bg-[#0277cc] transition-all border-none flex items-center justify-center">
            <h2 className="uppercase">Iniciar Sesión</h2>
          </Link>
        </div>



      </div>

    </div>
  );
}

export default Home;
