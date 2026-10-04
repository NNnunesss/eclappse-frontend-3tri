import { useEffect, useState } from 'react'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'
import { listarCasos } from '../services/api'

const STATUS_LABEL = {
  ATIVO: 'Ativo',
  ENCERRADO: 'Encerrado',
  ARQUIVADO: 'Arquivado',
  SOLICITADO_EXCLUSAO: 'Exclusão solicitada',
}

function rotuloStatus(status) {
  return STATUS_LABEL[status] || status || 'Sem status'
}

function formatarData(iso) {
  if (!iso) return 'Data não informada'
  const [ano, mes, dia] = iso.slice(0, 10).split('-')
  if (!ano || !mes || !dia) return iso
  return `${dia}/${mes}/${ano}`
}

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null
  const nascimento = new Date(`${dataNascimento}T00:00:00`)
  if (Number.isNaN(nascimento.getTime())) return null
  const hoje = new Date()
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade -= 1
  return idade >= 0 ? idade : null
}

function fotoSrc(foto) {
  if (!foto || typeof foto !== 'string') return null
  return `data:image/jpeg;base64,${foto}`
}

const Casos = () => {
  const [pesquisa, setPesquisa] = useState('')
  const [local, setLocal] = useState('')
  const [status, setStatus] = useState('')
  const [arrayCasos, setArrayCasos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true
    listarCasos()
      .then((casos) => {
        if (!ativo) return
        setArrayCasos(
          casos.map((caso) => ({
            id: caso.id,
            nome: caso.nomeDesaparecido,
            idade: calcularIdade(caso.dataNascimento),
            local: caso.localDesaparecimento,
            data: formatarData(caso.dataDesaparecimento),
            status: caso.statusCaso,
            descricao:
              caso.caracteristicasFisicas ||
              caso.circunstancias ||
              'Sem descrição informada.',
            foto: fotoSrc(caso.foto),
          })),
        )
      })
      .catch(() => {
        if (ativo) setErro('Não foi possível carregar os casos.')
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
  }, [])

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
            {Object.entries(STATUS_LABEL).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
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
          {carregando ? (
            <div className={style.emptyCases}>
              <h2>Carregando casos...</h2>
            </div>
          ) : erro ? (
            <div className={style.emptyCases}>
              <h2>{erro}</h2>
              <p>Confira se o backend está em execução na porta 8080.</p>
            </div>
          ) : casosFiltrados.length > 0 ? (
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
                  <span className={style.caseStatus}>{rotuloStatus(caso.status)}</span>
                  <h2>{caso.nome}</h2>
                  <p className={style.caseDescription}>{caso.descricao}</p>

                  <div className={style.caseMeta}>
                    <span>
                      <b>📍</b> {caso.local}
                    </span>
                    <span>
                      <b>📅</b> {caso.data}
                      {caso.idade != null ? ` (${caso.idade} anos)` : ''}
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