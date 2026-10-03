import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'

const QuemSomos = () => {

  return (

    <div className={style.page}>

      <Menu />

      <main className={style.content}>

        <section className={style.aboutHero}>

          <span className={style.eyebrow}>
            SOBRE O ECLAPPSE
          </span>

          <h1>
            Tecnologia para
            <br />
            aproximar pessoas.
          </h1>

          <p>
            O Eclappse é uma plataforma criada para facilitar
            o compartilhamento de informações sobre pessoas
            desaparecidas e aproximar famílias de possíveis
            respostas.
          </p>

        </section>


        <section className={style.aboutGrid}>

          <div>

            <span>
              01
            </span>

            <h2>
              Nossa missão
            </h2>

            <p>
              Tornar informações importantes mais acessíveis,
              organizadas e fáceis de compartilhar.
            </p>

          </div>


          <div>

            <span>
              02
            </span>

            <h2>
              Nossa visão
            </h2>

            <p>
              Utilizar a tecnologia como uma ferramenta de
              esperança para famílias em momentos difíceis.
            </p>

          </div>


          <div>

            <span>
              03
            </span>

            <h2>
              Nosso princípio
            </h2>

            <p>
              Cada caso representa uma pessoa, uma família
              e uma história que merece atenção.
            </p>

          </div>

        </section>


        <section className={style.aboutQuote}>

          <span>
            ECLAPPSE
          </span>

          <h2>
            “Não há medo sem esperança.”
          </h2>

          <p>
            Esse é o propósito que orienta cada parte
            da plataforma.
          </p>

        </section>

      </main>

      <Footer />

    </div>

  )

}

export default QuemSomos