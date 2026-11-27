export interface Project {
    id: number;
    /** logo do projeto ou da empresa (caminho dentro de public/) */
    capa1: string;
    /** print do projeto; o card alterna entre capa1 e capa2 */
    capa2?: string;
    /** imagens extras para a tela de detalhes */
    imagens?: string[];
    video?: string;
    titulo: string;
    descricao: string;
    objetivo: string;
    tecnologias: string[];
    link?: string;
    minhaColaboracao: string;
    categoria: Categoria;
}

export enum Categoria {
    Pessoal = "pessoal",
    Academico = "academico",
}
