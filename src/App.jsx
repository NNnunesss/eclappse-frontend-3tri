import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Adicione as importações que faltam no topo do ficheiro:
import Home from './pages/Home'
import Casos from './pages/Casos'
import QuemSomos from './pages/QuemSomos'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
  {/* Esta é a página que abre quando você acessa http://localhost:5173/ */}
  <Route path="/" element={<Home />} />
  <Route path="/casos" element={<Casos />} />
  <Route path="/quemsomos" element={<QuemSomos />} />
  <Route path="/cadastro" element={<Cadastro />} />
  <Route path="/login" element={<Login />} />
</Routes>
    </BrowserRouter>
  )
}

export default App