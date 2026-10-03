
import style from './Menu.module.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../images/logo.png'

const Menu = () => {

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

          <Link
            to="/login"
            className={style.login}
          >
            Entrar
          </Link>

          <Link
            to="/cadastro"
            className={style.register}
          >
            Criar conta
          </Link>

        </div>

      </div>

    </nav>

  )
}

export default Menu
