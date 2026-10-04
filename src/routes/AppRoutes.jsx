import {
  HashRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom"
import { usuarioLogado } from "../services/api"

function RotaPrivada({ children }) {
  if (!usuarioLogado()) {
    return <Navigate to="/login" replace state={{ from: "/gerenciar" }} />
  }
  return children
}

import Home from "../pages/Home"
import Casos from "../pages/Casos"
import QuemSomos from "../pages/QuemSomos"
import Cadastro from "../pages/Cadastro"
import Login from "../pages/Login"
import Gerenciar from "../pages/Gerenciar"

const AppRoutes = () => {

  return (

    <HashRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/casos"
          element={<Casos />}
        />

        <Route
          path="/gerenciar"
          element={
            <RotaPrivada>
              <Gerenciar />
            </RotaPrivada>
          }
        />

        <Route
          path="/quem-somos"
          element={<QuemSomos />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

    </HashRouter>

  )
}

export default AppRoutes