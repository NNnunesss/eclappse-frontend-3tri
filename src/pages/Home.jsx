import { useEffect, useState } from 'react'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'
import { listarCasos, listarUsuarios } from '../services/api'

const Home = () => {
  const [totais, setTotais] = useState(null)

  useEffect(() => {
    let ativo = true
    Promise.all([listarCasos(), listarUsuarios()])
      .then(([casos, usuarios]) => {
        if (!ativo) return
        setTotais({
          casos: casos.length,
          ativos: casos.filter((caso) => caso.statusCaso === 'ATIVO').length,
          pessoas: usuarios.length,
        })
      })
      .catch(() => {
        if (ativo) setTotais({ casos: 0, ativos: 0, pessoas: 0 })
      })
    return () => {
      ativo = false
    }
  }, [])

  const valor = (numero) => (totais ? numero : '...')

  return (
    <div className={style.page}>
      <Menu />

      <main className={style.content}>
        {/* HERO */}
        <section className={style.homeHero}>
          <div className={style.homeHeroContent}>
            <span className={style.eyebrow}>
              ECLAPPSE • CONECTANDO ESPERANÇAS
            </span>

            <h1>
              Quando alguém desaparece,
              <br />
              <strong>a esperança permanece.</strong>
            </h1>

            <p>
              O Eclappse é uma plataforma criada para facilitar a divulgação,
              consulta e compartilhamento de informações sobre pessoas
              desaparecidas.
            </p>

            <span className={style.slogan}>
              Não há medo sem esperança.
            </span>

            <div className={style.homeActions}>
              <a href="#/casos" className={style.homePrimaryButton}>
                Consultar casos
              </a>
              <a href="#/cadastro" className={style.homeSecondaryButton}>
                Quero ajudar
              </a>
            </div>
          </div>
        </section>

        {/* DADOS / ESTATÍSTICAS */}
        <section className={style.stats}>
          <div className={style.stat}>
            <strong>{valor(totais?.casos)}</strong>
            <span>casos registrados</span>
          </div>

          <div className={style.stat}>
            <strong>{valor(totais?.ativos)}</strong>
            <span>casos ativos</span>
          </div>

          <div className={style.stat}>
            <strong>{valor(totais?.pessoas)}</strong>
            <span>pessoas cadastradas</span>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className={style.aboutHero}>
          <span className={style.eyebrow}>COMO FUNCIONA</span>
          <h2>Uma informação pode fazer a diferença.</h2>
          <p className={style.aboutLead}>
            O Eclappse aproxima casos, informações e pessoas dispostas a ajudar.
          </p>

          <div className={style.aboutGrid} style={{ marginTop: '40px' }}>
            <article className={style.aboutCard}>
              <span className={style.aboutNumber}>01</span>
              <h2>Consulte</h2>
              <p>
                Encontre casos registrados e conheça suas informações.
              </p>
            </article>

            <article className={style.aboutCard}>
              <span className={style.aboutNumber}>02</span>
              <h2>Observe</h2>
              <p>
                Compartilhe os casos para que mais pessoas possam reconhecê-los.
              </p>
            </article>

            <article className={style.aboutCard}>
              <span className={style.aboutNumber}>03</span>
              <h2>Informe</h2>
              <p>
                Possui alguma informação? Registre sua contribuição.
              </p>
            </article>
          </div>
        </section>

        {/* CHAMADA (CTA) */}
        <section className={style.aboutQuote}>
          <span>A ESPERANÇA PRECISA DE PESSOAS</span>
          <h2>Talvez a próxima informação venha de você.</h2>
          <p style={{ marginBottom: '24px' }}>
            Sua participação é fundamental para apoiar famílias e conectar informações.
          </p>
          <a href="#/casos" className={style.homePrimaryButton}>
            Ver casos
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home