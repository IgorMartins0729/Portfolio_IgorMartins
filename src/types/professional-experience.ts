export interface ProfessionalExperience {
    id: number;
    empresa: string;
    cargo: string;
    inicioPeriodo: string;
    fimPeriodo?: string;
    /** caminho dentro de public/, ex: "empresas/kaffa.png" */
    logo?: string;
    /** tópicos do que fazia na empresa */
    descricao?: string[];
    tecnologias?: string[];
}