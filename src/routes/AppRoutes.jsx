import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "../pages/Home"
import Casos from "../pages/Casos"
import QuemSomos from "../pages/QuemSomos"
import Cadastro from "../pages/Cadastro"
import Login from "../pages/Login"

// BrowserRouter: Utilize com a tag <a> com href -> sempre recarrega toda página
// HashRouter:    Utilize com a tag <Link> do react-router-dom -> carrega apenas as partes necessárias da página, RECOMENDADO

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/casos" element={<Casos />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes