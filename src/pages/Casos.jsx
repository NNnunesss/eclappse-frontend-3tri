import { useState } from 'react'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'

const Casos = () => {
  const [pesquisa, setPesquisa] = useState('')
  const [local, setLocal] = useState('')
  const [status, setStatus] = useState('')

  const arrayCasos = [
    {
      id: 1,
      nome: 'João Silva',
      idade: 17,
      local: 'Barueri - SP',
      data: '12/09/2026',
      status: 'Desaparecido',
      descricao:
        'Cabelos castanhos, olhos castanhos e aproximadamente 1,70m de altura.',
      foto: null
    },
    {
      id: 2,
      nome: 'Maria Souza',
      idade: 21,
      local: 'Carapicuíba - SP',
      data: '18/09/2026',
      status: 'Desaparecida',
      descricao:
        'Cabelos pretos e longos, olhos castanhos e aproximadamente 1,65m de altura.',
      foto: null
    },
    {
      id: 3,
      nome: 'Pedro Santos',
      idade: 24,
      local: 'Osasco - SP',
      data: '22/09/2026',
      status: 'Desaparecido',
      descricao:
        'Cabelos pretos curtos, olhos castanhos e aproximadamente 1,75m de altura.',
      foto: null
    }
  ]

  // Extrai lista única de locais
  const locais = [...new Set(arrayCasos.map((caso) => caso.local))]

  // Aplica os filtros de nome, local e status
  const casosFiltrados = arrayCasos.filter((caso) => {
    const correspondeNome = caso.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase())

    const correspondeLocal = local === '' || caso.local === local

    const correspondeStatus = status === '' || caso.status === status

    return correspondeNome && correspondeLocal && correspondeStatus
  })

  return (
    <div className={style.page}>
      <Menu />

      <main className={style.content}>
        {/* CABEÇALHO */}
        <section className={style.pageHeader}>
          <div>
            <span className={style.eyebrow}>CONSULTA PÚBLICA</span>
            <h1>Pessoas desaparecidas</h1>
            <p>
              Consulte os casos registrados no Eclappse. Uma informação pode
              ajudar a trazer alguém de volta.
            </p>
          </div>

          <span className={style.caseCount}>
            {casosFiltrados.length} {casosFiltrados.length === 1 ? 'caso' : 'casos'}
          </span>
        </section>

        {/* FILTROS */}
        <section className={style.filters}>
          <div className={style.searchField}>
            <span>⌕</span>
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>

          <select
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            <option value="">Todos os locais</option>
            {locais.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="Desaparecido">Desaparecidos</option>
            <option value="Desaparecida">Desaparecidas</option>
          </select>

          <button
            type="button"
            className={style.clearFilters}
            onClick={() => {
              setPesquisa('')
              setLocal('')
              setStatus('')
            }}
          >
            Limpar
          </button>
        </section>

        {/* LISTA DE CASOS */}
        <section className={style.caseList}>
          {casosFiltrados.length > 0 ? (
            casosFiltrados.map((caso) => (
              <article className={style.caseCard} key={caso.id}>
                {/* FOTO / AVATAR */}
                <div className={style.caseAvatar}>
                  {caso.foto ? (
                    <img src={caso.foto} alt={`Foto de ${caso.nome}`} />
                  ) : (
                    <div className={style.noPhoto}>
                      <span style={{ fontSize: '1.2rem' }}>👤</span>
                      <small>Sem foto</small>
                    </div>
                  )}
                </div>

                {/* DETALHES DO CASO */}
                <div className={style.caseBody}>
                  <span className={style.caseStatus}>{caso.status}</span>
                  <h2>{caso.nome}</h2>
                  <p className={style.caseDescription}>{caso.descricao}</p>

                  <div className={style.caseMeta}>
                    <span>
                      <b>📍</b> {caso.local}
                    </span>
                    <span>
                      <b>📅</b> {caso.data} ({caso.idade} anos)
                    </span>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className={style.caseActions}>
                  <button type="button" className={style.informationButton}>
                    Tenho informações
                  </button>

                  <button type="button" className={style.detailsButton}>
                    Ver detalhes
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className={style.emptyCases}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>
                🔍
              </span>
              <h2>Nenhum caso encontrado</h2>
              <p>Tente alterar os filtros ou realizar outra pesquisa.</p>
            </div>
          )}
        </section>

        {/* CHAMADA / AJUDA */}
        <section className={style.caseHelp}>
          <div>
            <span className={style.eyebrow}>VOCÊ TEM UMA INFORMAÇÃO?</span>
            <h2>Não ignore uma informação.</h2>
            <p>
              Se você reconheceu alguém ou possui qualquer informação sobre um
              caso, sua contribuição pode ser fundamental.
            </p>
          </div>

          <a href="#/login">Tenho informações</a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Casos