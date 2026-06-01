const API = 'http://localhost:3001/api'

export interface Curso {
  id: number
  isCompleted: boolean
  nomeCurso: string
  localCurso: string
  inicioCurso: string
  fimCurso: string
}

export type CursoInput = Omit<Curso, 'id'>

const checarResposta = async (res: Response) => {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
  return res.json()
}

export const getCursos = async (): Promise<Curso[]> => {
  const res = await fetch(`${API}/cursos`)
  return checarResposta(res)
}

export const adicionarCurso = async (curso: CursoInput): Promise<Curso> => {
  const res = await fetch(`${API}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso),
  })
  return checarResposta(res)
}

export const editarCurso = async (id: number, curso: CursoInput): Promise<Curso> => {
  const res = await fetch(`${API}/cursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso),
  })
  return checarResposta(res)
}

export const excluirCurso = async (id: number): Promise<void> => {
  const res = await fetch(`${API}/cursos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
}
