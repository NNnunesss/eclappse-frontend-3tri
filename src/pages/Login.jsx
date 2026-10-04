import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'
import { entrar, salvarSessao } from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from || '/casos'
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function acessar(event) {
    event.preventDefault()
    setMensagem('')

    if (!email.trim() || !senha) {
      setMensagem('Informe e-mail e senha.')
      return
    }

    setEnviando(true)
    try {
      const usuario = await entrar(email.trim(), senha)
      salvarSessao(usuario)
      navigate(destino)
    } catch (error) {
      setMensagem(
        error.status === 401
          ? 'E-mail ou senha inválidos.'
          : 'Não foi possível entrar. Tente novamente.',
      )
    } finally {
      setEnviando(false)
    }
  }

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
              {destino === '/gerenciar'
                ? 'Entre na sua conta para gerenciar os casos.'
                : 'Entre na sua conta para acompanhar casos e compartilhar informações que podem ajudar uma família.'}
            </p>
          </div>

          <form className={style.formCard} onSubmit={acessar}>
            <div className={style.formGroup}>
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            {mensagem && (
              <p className={`${style.formMessage} ${style.formMessageError}`}>
                {mensagem}
              </p>
            )}

            <button
              type="submit"
              className={style.primaryButton}
              disabled={enviando}
            >
              {enviando ? 'Entrando...' : 'Entrar'}
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
