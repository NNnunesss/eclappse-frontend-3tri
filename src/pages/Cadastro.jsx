import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'
import { cadastrarUsuario, salvarSessao } from '../services/api'

const Cadastro = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function criarConta(event) {
    event.preventDefault()
    setMensagem('')

    if (!nome.trim() || !email.trim() || !senha) {
      setMensagem('Preencha nome, e-mail e senha.')
      return
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.')
      return
    }

    setEnviando(true)
    try {
      const usuario = await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        username: email.trim(),
        password: senha,
        perfil: 'VISITANTE',
        statusConta: 'ATIVO',
      })
      salvarSessao(usuario)
      navigate('/casos')
    } catch (error) {
      setMensagem(
        error.status === 500
          ? 'Não foi possível criar a conta. Esse e-mail pode já estar cadastrado.'
          : error.message,
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

          <form className={style.formCard} onSubmit={criarConta}>
            <div className={style.formGroup}>
              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
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
                placeholder="Crie uma senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
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
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
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
              {enviando ? 'Criando conta...' : 'Criar conta'}
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
