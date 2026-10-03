import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'

const Cadastro = () => {
  return (
    <div className={style.page}>
      <Menu />

      <main className={style.content}>
        <section className={style.formSection}>
          <div className={style.formHeader}>
            <span className={style.eyebrow}>
              CRIE SUA CONTA
            </span>

            <h1>
              Faça parte do Eclappse.
            </h1>

            <p>
              Cadastre-se para acompanhar casos e contribuir com
              informações importantes.
            </p>
          </div>

          <form className={style.formCard}>
            <div className={style.formGroup}>
              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Crie uma senha"
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="confirmarSenha">
                Confirmar senha
              </label>

              <input
                id="confirmarSenha"
                type="password"
                placeholder="Digite a senha novamente"
              />
            </div>

            <button
              type="submit"
              className={style.primaryButton}
            >
              Criar conta
            </button>

            <p className={style.formFooter}>
              Já possui uma conta?{' '}
              <a href="#/login">
                Fazer login
              </a>
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Cadastro
