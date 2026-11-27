export interface Project {
    id: number;
    imagem: string;
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