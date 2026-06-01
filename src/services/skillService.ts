const API = 'http://localhost:3001/api'

export type TipoSkill = 'hard' | 'soft'

export interface Skill {
  id: number
  nome: string
  tipo: TipoSkill
  icone: string
}

export type SkillInput = Omit<Skill, 'id'>

export const ICONES_SOFT = ['Network', 'Clock', 'BookOpen', 'Rocket', 'Compass', 'Star', 'Heart', 'Brain'] as const

const checarResposta = async (res: Response) => {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
  return res.json()
}

export const getSkills = async (): Promise<Skill[]> => {
  const res = await fetch(`${API}/skills`)
  return checarResposta(res)
}

export const adicionarSkill = async (skill: SkillInput): Promise<Skill> => {
  const res = await fetch(`${API}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  })
  return checarResposta(res)
}

export const editarSkill = async (id: number, skill: SkillInput): Promise<Skill> => {
  const res = await fetch(`${API}/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  })
  return checarResposta(res)
}

export const excluirSkill = async (id: number): Promise<void> => {
  const res = await fetch(`${API}/skills/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
}
