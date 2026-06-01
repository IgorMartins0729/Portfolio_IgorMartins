const API = 'http://localhost:3001/api'

export interface Experiencia {
  id: number
  nomeEmpresa: string
  cargo: string
  periodo: string
}

export type ExperienciaInput = Omit<Experiencia, 'id'>

const checarResposta = async (res: Response) => {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
  return res.json()
}

export const getExperiencias = async (): Promise<Experiencia[]> => {
  const res = await fetch(`${API}/experiencias`)
  return checarResposta(res)
}

export const adicionarExperiencia = async (exp: ExperienciaInput): Promise<Experiencia> => {
  const res = await fetch(`${API}/experiencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp),
  })
  return checarResposta(res)
}

export const editarExperiencia = async (id: number, exp: ExperienciaInput): Promise<Experiencia> => {
  const res = await fetch(`${API}/experiencias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp),
  })
  return checarResposta(res)
}

export const excluirExperiencia = async (id: number): Promise<void> => {
  const res = await fetch(`${API}/experiencias/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
}
