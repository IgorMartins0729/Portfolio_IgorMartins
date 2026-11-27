const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** "Dez 2025" -> total de meses (ano * 12 + mês); null se o formato não bater */
export function paraMeses(periodo: string): number | null {
  const [mes, ano] = periodo.trim().toLowerCase().split(/\s+/)
  const indice = MESES.indexOf(mes?.slice(0, 3))
  return indice < 0 || !Number(ano) ? null : Number(ano) * 12 + indice
}

export function mesAtual(): number {
  const hoje = new Date()
  return hoje.getFullYear() * 12 + hoje.getMonth()
}
