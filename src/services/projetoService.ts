import sanjaImg from "../assets/sanja.png"
import sjcImg from "../assets/sjc.png"

export interface Projeto {
    id: number
    titulo: string
    descricao: string
    tecnologias: string
    imagem: string
    link: string
}

export type ProjetoInput = Omit<Projeto, "id">

const STORAGE_KEY = "meusProjetos_v3"

const projetosIniciais: Projeto[] = [
    {
        id: 1,
        titulo: "E-commerce SanjaFeet",
        descricao: "Plataforma de comércio desenvolvida para venda de calçados esportivos e casuais. O sistema gerencia catálogo de produtos e navegação do usuário.",
        tecnologias: "PHP",
        imagem: sanjaImg,
        link: "https://github.com/IgorMartins0729/ProjectSanjaFeet_TCCTechnical"
    },
    {
        id: 2,
        titulo: "Portal de Dados SJC",
        descricao: "Aplicação web interativa que exibe análises demográficas, de trânsito e serviços públicos de São José dos Campos.",
        tecnologias: "Python",
        imagem: sjcImg,
        link: "https://github.com/FATCK06/ProjectAPI_FirstSemester"
    }
]

const salvar = (projetos: Projeto[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos))
}

export const getProjetos = (): Projeto[] => {
    const textoSalvo = localStorage.getItem(STORAGE_KEY)
    if (textoSalvo != null) {
        return JSON.parse(textoSalvo)
    }
    salvar(projetosIniciais)
    return projetosIniciais
}

export const adicionarProjeto = (projeto: ProjetoInput): Projeto[] => {
    const lista = getProjetos()
    const novo: Projeto = { id: Date.now(), ...projeto }
    const atualizado = [...lista, novo]
    salvar(atualizado)
    return atualizado
}

export const editarProjeto = (id: number, projeto: ProjetoInput): Projeto[] => {
    const lista = getProjetos()
    const atualizado = lista.map(p => (p.id === id ? { id, ...projeto } : p))
    salvar(atualizado)
    return atualizado
}

export const excluirProjeto = (id: number): Projeto[] => {
    const lista = getProjetos()
    const atualizado = lista.filter(p => p.id !== id)
    salvar(atualizado)
    return atualizado
}
