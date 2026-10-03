import style from './Menu.module.css'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light p-2 rounded shadow-sm w-100 ${style.menu}`}>
      <Link className={`navbar-brand ${style.logo}`} to="/">
        Home
      </Link>
      {/* Botão Hamburguer para telas menores */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className={`nav-link ${style.itemMenu}`} to="/casos">
              Casos
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${style.itemMenu}`} to="/quem-somos">
              Quem Somos
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${style.itemMenu}`} to="/cadastro">
              Cadastro
            </Link>
          </li>
        </ul>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Menu