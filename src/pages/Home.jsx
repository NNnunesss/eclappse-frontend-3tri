

export default function Home() {
  return (
    <div>
      {/* Barra de navegação do Bootstrap no topo */}
      <Menu />

      {/* Conteúdo da sua página */}
      <div className="container mt-4">
        <h1>Página Home</h1>
        <p>A Página está Funcionando!</p>
      </div>
    </div>
  )
}

import Menu from '../assets/components/Menu.jsx'