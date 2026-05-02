import certificadoFatec from "../assets/CERTIFICADO_-_2025-2_page-0001.jpg"

export interface Certificado {
    id: number
    nome: string
    instituicao: string
    dataEmissao: string
    imagem: string
}

export type CertificadoInput = Omit<Certificado, "id">

const STORAGE_KEY = "meusCertificados_v2"

const certificadosIniciais: Certificado[] = [
    {
        id: 1,
        nome: "Certificado FATEC 2025-2",
        instituicao: "FATEC São José dos Campos",
        dataEmissao: "12/2025",
        imagem: certificadoFatec
    }
]

const salvar = (certificados: Certificado[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certificados))
}

export const getCertificados = (): Certificado[] => {
    const textoSalvo = localStorage.getItem(STORAGE_KEY)
    if (textoSalvo != null) {
        return JSON.parse(textoSalvo)
    }
    salvar(certificadosIniciais)
    return certificadosIniciais
}

export const adicionarCertificado = (cert: CertificadoInput): Certificado[] => {
    const lista = getCertificados()
    const novo: Certificado = { id: Date.now(), ...cert }
    const atualizado = [...lista, novo]
    salvar(atualizado)
    return atualizado
}

export const editarCertificado = (id: number, cert: CertificadoInput): Certificado[] => {
    const lista = getCertificados()
    const atualizado = lista.map(c => (c.id === id ? { id, ...cert } : c))
    salvar(atualizado)
    return atualizado
}

export const excluirCertificado = (id: number): Certificado[] => {
    const lista = getCertificados()
    const atualizado = lista.filter(c => c.id !== id)
    salvar(atualizado)
    return atualizado
}
