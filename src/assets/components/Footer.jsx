import { Link } from 'react-router-dom'
import style from './Footer.module.css'

const Footer = () => {

  return (

    <footer className={style.footer}>

      <div className={style.footerContainer}>

        <div className={style.brand}>

          <div className={style.brandTitle}>
            <span>Eclappse</span>
          </div>

          <p>
            Tecnologia a serviço da esperança.
          </p>

          <strong>
            Não há medo sem esperança.
          </strong>

        </div>


        <div className={style.footerLinks}>

          <div>

            <span>
              Navegação
            </span>

            <Link to="/">
              Início
            </Link>

            <Link to="/casos">
              Casos
            </Link>

            <Link to="/quem-somos">
              Quem somos
            </Link>

          </div>


          <div>

            <span>
              Conta
            </span>

            <Link to="/login">
              Entrar
            </Link>

            <Link to="/cadastro">
              Criar conta
            </Link>

          </div>

        </div>

      </div>


      <div className={style.bottom}>

        <span>
          © 2026 Eclappse
        </span>

        <span>
          Feito para conectar pessoas e esperança.
        </span>

      </div>

    </footer>

  )
}

export default Footer

