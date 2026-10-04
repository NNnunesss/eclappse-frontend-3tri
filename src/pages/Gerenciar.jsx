import { useEffect, useState } from 'react'
import Menu from '../assets/components/Menu'
import Footer from '../assets/components/Footer'
import style from './Pages.module.css'
import {
  atualizarCaso,
  criarCaso,
  excluirCaso,
  listarCasos,
  listarUsuarios,
  usuarioLogado,
} from '../services/api'

const STATUS = [
  ['ATIVO', 'Ativo'],
  ['ENCERRADO', 'Encerrado'],
  ['ARQUIVADO', 'Arquivado'],
  ['SOLICITADO_EXCLUSAO', 'Exclusão solicitada'],
]

const VAZIO = {
  nomeDesaparecido: '',
  dataNascimento: '',
  dataDesaparecimento: '',
  localDesaparecimento: '',
  caracteristicasFisicas: '',
  circunstancias: '',
  statusCaso: 'ATIVO',
  usuarioId: '',
}

function rotuloStatus(status) {
  return STATUS.find(([valor]) => valor === status)?.[1] || status
}

function formatarData(iso) {
  if (!iso) return 'Sem data'
  const [ano, mes, dia] = iso.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

const Gerenciar = () => {
  const [casos, setCasos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState(VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [excluindoId, setExcluindoId] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function carregar() {
    const [listaCasos, listaUsuarios] = await Promise.all([
      listarCasos(),
      listarUsuarios(),
    ])
    setCasos(listaCasos)
    setUsuarios(listaUsuarios)
    return listaUsuarios
  }

  useEffect(() => {
    let ativo = true
    carregar()
      .then((listaUsuarios) => {
        if (!ativo) return
        const logado = usuarioLogado()
        const usuarioId = String(logado?.id || listaUsuarios[0]?.id || '')
        setForm((atual) => ({ ...atual, usuarioId }))
      })
      .catch(() => {
        if (ativo) setErro('Não foi possível carregar os dados.')
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
  }, [])

  function limparFormulario(usuarioId = form.usuarioId) {
    setEditandoId(null)
    setForm({ ...VAZIO, usuarioId })
  }

  function editar(caso) {
    setMensagem('')
    setErro('')
    setExcluindoId(null)
    setEditandoId(caso.id)
    setForm({
      nomeDesaparecido: caso.nomeDesaparecido || '',
      dataNascimento: caso.dataNascimento || '',
      dataDesaparecimento: caso.dataDesaparecimento || '',
      localDesaparecimento: caso.localDesaparecimento || '',
      caracteristicasFisicas: caso.caracteristicasFisicas || '',
      circunstancias: caso.circunstancias || '',
      statusCaso: caso.statusCaso || 'ATIVO',
      usuarioId: String(caso.usuarioResponsavel?.id || ''),
    })
  }

  async function salvar(event) {
    event.preventDefault()
    setMensagem('')
    setErro('')

    if (!form.nomeDesaparecido.trim() || !form.dataDesaparecimento || !form.localDesaparecimento.trim()) {
      setErro('Preencha nome, data e local do desaparecimento.')
      return
    }

    if (!form.usuarioId) {
      setErro('Cadastre um usuário antes de criar um caso.')
      return
    }

    const dados = {
      nomeDesaparecido: form.nomeDesaparecido.trim(),
      dataNascimento: form.dataNascimento || null,
      dataDesaparecimento: form.dataDesaparecimento,
      localDesaparecimento: form.localDesaparecimento.trim(),
      caracteristicasFisicas: form.caracteristicasFisicas.trim() || null,
      circunstancias: form.circunstancias.trim() || null,
      statusCaso: form.statusCaso,
      usuarioResponsavel: { id: Number(form.usuarioId) },
    }

    setEnviando(true)
    try {
      if (editandoId) {
        await atualizarCaso(editandoId, dados)
        setMensagem('Caso atualizado.')
      } else {
        await criarCaso(dados)
        setMensagem('Caso criado.')
      }
      await carregar()
      limparFormulario(form.usuarioId)
    } catch {
      setErro('Não foi possível salvar o caso.')
    } finally {
      setEnviando(false)
    }
  }

  async function confirmarExclusao(id) {
    setErro('')
    setMensagem('')
    try {
      await excluirCaso(id)
      if (editandoId === id) limparFormulario()
      setExcluindoId(null)
      setMensagem('Caso excluído.')
      await carregar()
    } catch {
      setErro('Não foi possível excluir o caso.')
    }
  }

  return (
    <div className={style.page}>
      <Menu />

      <main className={style.content}>
        <section className={style.pageHeader}>
          <div>
            <span className={style.eyebrow}>ADMINISTRAÇÃO</span>
            <h1>Gerenciar casos</h1>
            <p>
              Crie, atualize e exclua os casos gravados no banco.
            </p>
          </div>
        </section>

        <section className={`${style.formSection} ${style.crudSection}`}>
          <form className={style.formCard} onSubmit={salvar}>
            <div className={style.formGrid}>
              <div className={style.formGroup}>
                <label htmlFor="nomeDesaparecido">Nome</label>
                <input
                  id="nomeDesaparecido"
                  value={form.nomeDesaparecido}
                  onChange={(event) => atualizarCampo('nomeDesaparecido', event.target.value)}
                  placeholder="Nome da pessoa desaparecida"
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="usuarioId">Responsável</label>
                <select
                  id="usuarioId"
                  value={form.usuarioId}
                  onChange={(event) => atualizarCampo('usuarioId', event.target.value)}
                >
                  <option value="">Selecione</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.formGroup}>
                <label htmlFor="dataDesaparecimento">Data do desaparecimento</label>
                <input
                  id="dataDesaparecimento"
                  type="date"
                  value={form.dataDesaparecimento}
                  onChange={(event) => atualizarCampo('dataDesaparecimento', event.target.value)}
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="dataNascimento">Data de nascimento</label>
                <input
                  id="dataNascimento"
                  type="date"
                  value={form.dataNascimento}
                  onChange={(event) => atualizarCampo('dataNascimento', event.target.value)}
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="localDesaparecimento">Local</label>
                <input
                  id="localDesaparecimento"
                  value={form.localDesaparecimento}
                  onChange={(event) => atualizarCampo('localDesaparecimento', event.target.value)}
                  placeholder="Cidade - UF"
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="statusCaso">Status</label>
                <select
                  id="statusCaso"
                  value={form.statusCaso}
                  onChange={(event) => atualizarCampo('statusCaso', event.target.value)}
                >
                  {STATUS.map(([valor, rotulo]) => (
                    <option key={valor} value={valor}>
                      {rotulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${style.formGroup} ${style.formSpan}`}>
                <label htmlFor="caracteristicasFisicas">Características</label>
                <textarea
                  id="caracteristicasFisicas"
                  rows="3"
                  value={form.caracteristicasFisicas}
                  onChange={(event) => atualizarCampo('caracteristicasFisicas', event.target.value)}
                  placeholder="Descrição física"
                />
              </div>

              <div className={`${style.formGroup} ${style.formSpan}`}>
                <label htmlFor="circunstancias">Circunstâncias</label>
                <textarea
                  id="circunstancias"
                  rows="3"
                  value={form.circunstancias}
                  onChange={(event) => atualizarCampo('circunstancias', event.target.value)}
                  placeholder="O que se sabe sobre o desaparecimento"
                />
              </div>
            </div>

            {mensagem && <p className={style.formMessage}>{mensagem}</p>}
            {erro && (
              <p className={`${style.formMessage} ${style.formMessageError}`}>{erro}</p>
            )}

            <div className={style.formActions}>
              <button type="submit" className={style.primaryButton} disabled={enviando}>
                {enviando ? 'Salvando...' : editandoId ? 'Atualizar caso' : 'Criar caso'}
              </button>
              {editandoId && (
                <button
                  type="button"
                  className={style.detailsButton}
                  onClick={() => limparFormulario()}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className={style.caseList}>
          {carregando ? (
            <div className={style.emptyCases}>
              <h2>Carregando casos...</h2>
            </div>
          ) : casos.length === 0 ? (
            <div className={style.emptyCases}>
              <h2>Nenhum caso cadastrado</h2>
              <p>Use o formulário acima para criar o primeiro.</p>
            </div>
          ) : (
            casos.map((caso) => (
              <article className={style.caseCard} key={caso.id}>
                <div className={style.caseBody}>
                  <span className={style.caseStatus}>{rotuloStatus(caso.statusCaso)}</span>
                  <h2>{caso.nomeDesaparecido}</h2>
                  <p className={style.caseDescription}>
                    {caso.caracteristicasFisicas || caso.circunstancias || 'Sem descrição informada.'}
                  </p>
                  <div className={style.caseMeta}>
                    <span>
                      <b>📍</b> {caso.localDesaparecimento}
                    </span>
                    <span>
                      <b>📅</b> {formatarData(caso.dataDesaparecimento)}
                    </span>
                  </div>
                </div>

                <div className={style.caseActions}>
                  {excluindoId === caso.id ? (
                    <>
                      <button
                        type="button"
                        className={style.deleteButton}
                        onClick={() => confirmarExclusao(caso.id)}
                      >
                        Confirmar exclusão
                      </button>
                      <button
                        type="button"
                        className={style.detailsButton}
                        onClick={() => setExcluindoId(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={style.detailsButton}
                        onClick={() => editar(caso)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className={style.deleteButton}
                        onClick={() => setExcluindoId(caso.id)}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Gerenciar
