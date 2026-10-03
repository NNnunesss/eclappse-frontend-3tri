import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'

const Login = () => {
  return (
    <div className={style.page}>
      <Menu />

      <main className={style.content}>
        <section className={style.formSection}>
          <div className={style.formHeader}>
            <span className={style.eyebrow}>
              ACESSO À PLATAFORMA
            </span>

            <h1>
              Bem-vindo de volta!
            </h1>

            <p>
              Entre na sua conta para acompanhar casos e compartilhar
              informações que podem ajudar uma família.
            </p>
          </div>

          <form className={style.formCard}>
            <div className={style.formGroup}>
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className={style.primaryButton}
            >
              Entrar
            </button>

            <p className={style.formFooter}>
              Ainda não possui uma conta?{' '}
              <a href="#/cadastro">
                Cadastre-se
              </a>
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Login
