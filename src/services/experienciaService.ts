export interface Experiencia {
    id: number
    nomeEmpresa: string
    cargo: string
    periodo: string
}

export type ExperienciaInput = Omit<Experiencia, "id">

const STORAGE_KEY = "minhasExperiencias"

const experienciasIniciais: Experiencia[] = [
    { id: 1, nomeEmpresa: "Kaffa Tech", cargo: "Estagiário de Desenvolvimento de Software", periodo: "Dez 2025 - Atual" },
    { id: 2, nomeEmpresa: "Sonaca Brasil", cargo: "Auxiliar de TI", periodo: "Mar 2024 - Jun 2025" }
]

const salvar = (experiencias: Experiencia[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experiencias))
}

export const getExperiencias = (): Experiencia[] => {
    const textoSalvo = localStorage.getItem(STORAGE_KEY)
    if (textoSalvo != null) {
        return JSON.parse(textoSalvo)
    }
    salvar(experienciasIniciais)
    return experienciasIniciais
}

export const adicionarExperiencia = (exp: ExperienciaInput): Experiencia[] => {
    const lista = getExperiencias()
    const nova: Experiencia = { id: Date.now(), ...exp }
    const atualizado = [...lista, nova]
    salvar(atualizado)
    return atualizado
}

export const editarExperiencia = (id: number, exp: ExperienciaInput): Experiencia[] => {
    const lista = getExperiencias()
    const atualizado = lista.map(e => (e.id === id ? { id, ...exp } : e))
    salvar(atualizado)
    return atualizado
}

export const excluirExperiencia = (id: number): Experiencia[] => {
    const lista = getExperiencias()
    const atualizado = lista.filter(e => e.id !== id)
    salvar(atualizado)
    return atualizado
}
