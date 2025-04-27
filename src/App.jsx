import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Principal from "./paginas/Principal";
import Registro from "./paginas/Registro";
import Perfil from "./paginas/Perfil";
import Test from "./paginas/Test";
import TestCompletado from "./paginas/TestCompletado";
import Top5 from "./paginas/Top5";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test-completado" element={<TestCompletado />} />
        <Route path="/top5" element={<Top5 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
