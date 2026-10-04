
import { useState } from 'react'
import style from './Menu.module.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { encerrarSessao, usuarioLogado } from '../../services/api'

const Menu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [usuario, setUsuario] = useState(() => usuarioLogado())

  function sair() {
    encerrarSessao()
    setUsuario(null)
    if (location.pathname === '/gerenciar') navigate('/login')
  }

  return (

    <nav className={style.menu}>

      <div className={style.menuContainer}>

        <Link
          to="/"
          className={style.logoArea}
        >

          <img
            src={logo}
            alt="Eclappse"
            className={style.logoImage}
          />

          <span className={style.logoText}>
            Eclappse
          </span>

        </Link>


        <div className={style.links}>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            Início
          </NavLink>

          <NavLink
            to="/casos"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            Casos
          </NavLink>

          {usuario && (
            <NavLink
              to="/gerenciar"
              className={({ isActive }) =>
                `${style.link} ${isActive ? style.active : ''}`
              }
            >
              Gerenciar
            </NavLink>
          )}

          <NavLink
            to="/quem-somos"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            Quem somos
          </NavLink>

        </div>


        <div className={style.actions}>

          {usuario ? (
            <span className={style.login}>
              {usuario.nome?.split(' ')[0]}
            </span>
          ) : (
            <Link
              to="/login"
              className={style.login}
            >
              Entrar
            </Link>
          )}

          {usuario ? (
            <button
              type="button"
              className={style.register}
              onClick={sair}
            >
              Sair
            </button>
          ) : (
            <Link
              to="/cadastro"
              className={style.register}
            >
              Criar conta
            </Link>
          )}

        </div>

      </div>

    </nav>

  )
}

export default Menu
