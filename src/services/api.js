const SESSAO = 'eclappse_usuario'

async function request(path, options = {}) {
  const response = await fetch(`/api/v1${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'Não foi possível concluir a operação.'
    try {
      const body = await response.json()
      if (body.message) message = body.message
    } catch {
      // a resposta de erro nem sempre vem em JSON
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  if (response.status === 204) return null
  return response.json()
}

export function listarCasos() {
  return request('/casos')
}

export function criarCaso(dados) {
  return request('/casos', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function atualizarCaso(id, dados) {
  return request(`/casos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  })
}

export function excluirCaso(id) {
  return request(`/casos/${id}`, {
    method: 'DELETE',
  })
}

export function listarUsuarios() {
  return request('/usuarios')
}

export function cadastrarUsuario(dados) {
  return request('/usuarios', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function entrar(email, password) {
  return request('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function usuarioLogado() {
  const salvo = sessionStorage.getItem(SESSAO)
  if (!salvo) return null
  try {
    return JSON.parse(salvo)
  } catch {
    return null
  }
}

export function salvarSessao(usuario) {
  sessionStorage.setItem(SESSAO, JSON.stringify(usuario))
}

export function encerrarSessao() {
  sessionStorage.removeItem(SESSAO)
}
