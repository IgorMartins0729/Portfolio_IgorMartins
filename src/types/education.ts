export interface Education {
    id: number;
    curso: string;
    instituicao: string;
    /** ex: "Tecnólogo", "Ensino Médio" */
    grau?: string;
    inicioPeriodo: string;
    /** fim real ou previsto; se ainda não passou, o curso aparece como "Cursando" */
    fimPeriodo?: string;
    /** disciplinas já cursadas; as primeiras aparecem antes do "Ver todas" */
    destaques?: string[];
}
