export interface Curso {
    id: number
    isCompleted: boolean
    nomeCurso: string
    localCurso: string
    inicioCurso: string
    fimCurso: string
}

export type CursoInput = Omit<Curso, "id">

const STORAGE_KEY = "meusCursos"

const cursosIniciais: Curso[] = [
    {
        id: 1,
        isCompleted: false,
        nomeCurso: "Desenvolvimento de Software Multiplataforma",
        localCurso: "FATEC São José dos Campos",
        inicioCurso: "08/2025",
        fimCurso: "07/2028"
    },
    {
        id: 2,
        isCompleted: true,
        nomeCurso: "Técnico de Informática",
        localCurso: "Colégio Joseense",
        inicioCurso: "01/2020",
        fimCurso: "12/2022"
    }
]

const salvar = (cursos: Curso[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cursos))
}

export const getCursos = (): Curso[] => {
    const textoSalvo = localStorage.getItem(STORAGE_KEY)
    if (textoSalvo != null) {
        return JSON.parse(textoSalvo)
    }
    salvar(cursosIniciais)
    return cursosIniciais
}

export const adicionarCurso = (curso: CursoInput): Curso[] => {
    const cursos = getCursos()
    const novo: Curso = { id: Date.now(), ...curso }
    const atualizado = [...cursos, novo]
    salvar(atualizado)
    return atualizado
}

export const editarCurso = (id: number, curso: CursoInput): Curso[] => {
    const cursos = getCursos()
    const atualizado = cursos.map(c => (c.id === id ? { id, ...curso } : c))
    salvar(atualizado)
    return atualizado
}

export const excluirCurso = (id: number): Curso[] => {
    const cursos = getCursos()
    const atualizado = cursos.filter(c => c.id !== id)
    salvar(atualizado)
    return atualizado
}
