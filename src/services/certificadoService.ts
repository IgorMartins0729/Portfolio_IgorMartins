const API = 'http://localhost:3001/api'

export interface Certificado {
  id: number
  nome: string
  instituicao: string
  dataEmissao: string
  imagem: string
}

export type CertificadoInput = Omit<Certificado, 'id'>

const checarResposta = async (res: Response) => {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
  return res.json()
}

export const getCertificados = async (): Promise<Certificado[]> => {
  const res = await fetch(`${API}/certificados`)
  return checarResposta(res)
}

export const adicionarCertificado = async (cert: CertificadoInput): Promise<Certificado> => {
  const res = await fetch(`${API}/certificados`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cert),
  })
  return checarResposta(res)
}

export const editarCertificado = async (id: number, cert: CertificadoInput): Promise<Certificado> => {
  const res = await fetch(`${API}/certificados/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cert),
  })
  return checarResposta(res)
}

export const excluirCertificado = async (id: number): Promise<void> => {
  const res = await fetch(`${API}/certificados/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
}
