export interface Certificate {
    id: number;
    titulo: string;
    instituicao: string;
    /** caminho dentro de public/, ex: "certificados/foo.jpg" */
    imagem: string;
    /** ex: "Out 2025" */
    dataEmissao?: string;
    cargaHoraria?: string;
    /** caminho do PDF dentro de public/ */
    pdf?: string;
    /** true para badge/medalha digital: imagem quadrada, mostrada inteira em vez de recortada */
    badge?: boolean;
    competencias?: string[];
}
