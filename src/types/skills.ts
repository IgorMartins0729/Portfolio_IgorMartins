export interface Tecnologia {
    nome: string;
    /** caminho do ícone no Devicon, ex: "react/react-original" (veja devicon.dev) */
    icone?: string;
    /** true para ícones pretos, que sumiriam no fundo escuro */
    inverterIcone?: boolean;
}

export interface CategoriaSkill {
    categoria: string;
    itens: Tecnologia[];
}

export interface Skills {
    hardSkills: CategoriaSkill[];
    softSkills: string[];
}
