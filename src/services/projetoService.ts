const API = 'http://localhost:3001/api'

export interface Projeto {
  id: number
  titulo: string
  descricao: string
  tecnologias: string
  imagem: string
  link: string
}

export type ProjetoInput = Omit<Projeto, 'id'>

const checarResposta = async (res: Response) => {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
  return res.json()
}

export const getProjetos = async (): Promise<Projeto[]> => {
  const res = await fetch(`${API}/projetos`)
  return checarResposta(res)
}

export const adicionarProjeto = async (projeto: ProjetoInput): Promise<Projeto> => {
  const res = await fetch(`${API}/projetos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projeto),
  })
  return checarResposta(res)
}

export const editarProjeto = async (id: number, projeto: ProjetoInput): Promise<Projeto> => {
  const res = await fetch(`${API}/projetos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projeto),
  })
  return checarResposta(res)
}

export const excluirProjeto = async (id: number): Promise<void> => {
  const res = await fetch(`${API}/projetos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
}
