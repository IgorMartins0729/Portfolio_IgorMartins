export type TipoSkill = "hard" | "soft"

export interface Skill {
    id: number
    nome: string
    tipo: TipoSkill
    icone: string
}

export type SkillInput = Omit<Skill, "id">

export const ICONES_SOFT = ["Network", "Clock", "BookOpen", "Rocket", "Compass", "Star", "Heart", "Brain"] as const

const STORAGE_KEY = "minhasSkills"

const skillsIniciais: Skill[] = [
    { id: 1, nome: "React", tipo: "hard", icone: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png" },
    { id: 2, nome: "Python", tipo: "hard", icone: "https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png" },
    { id: 3, nome: "Typescript", tipo: "hard", icone: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png" },
    { id: 4, nome: "C#", tipo: "hard", icone: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png" },
    { id: 5, nome: "Trabalho em Equipe", tipo: "soft", icone: "Network" },
    { id: 6, nome: "Gestão de Tempo", tipo: "soft", icone: "Clock" },
    { id: 7, nome: "Proatividade", tipo: "soft", icone: "Rocket" },
    { id: 8, nome: "Autonomia", tipo: "soft", icone: "Compass" },
    { id: 9, nome: "Aprendizado Contínuo", tipo: "soft", icone: "BookOpen" }
]

const salvar = (skills: Skill[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills))
}

export const getSkills = (): Skill[] => {
    const textoSalvo = localStorage.getItem(STORAGE_KEY)
    if (textoSalvo != null) {
        return JSON.parse(textoSalvo)
    }
    salvar(skillsIniciais)
    return skillsIniciais
}

export const adicionarSkill = (skill: SkillInput): Skill[] => {
    const lista = getSkills()
    const nova: Skill = { id: Date.now(), ...skill }
    const atualizado = [...lista, nova]
    salvar(atualizado)
    return atualizado
}

export const editarSkill = (id: number, skill: SkillInput): Skill[] => {
    const lista = getSkills()
    const atualizado = lista.map(s => (s.id === id ? { id, ...skill } : s))
    salvar(atualizado)
    return atualizado
}

export const excluirSkill = (id: number): Skill[] => {
    const lista = getSkills()
    const atualizado = lista.filter(s => s.id !== id)
    salvar(atualizado)
    return atualizado
}
