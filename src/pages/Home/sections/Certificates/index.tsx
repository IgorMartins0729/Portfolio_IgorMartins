import React, { useState, useEffect } from 'react'
import styles from './Certificates.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import {
  getCertificados,
  adicionarCertificado,
  editarCertificado,
  excluirCertificado
} from '../../../../../services/certificadoService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

const formInicial = { nome: '', instituicao: '', dataEmissao: '', imagem: '' }

function Certificates() {
  const [certificados, setCertificados] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(false)
  const [modo, setModo] = useState(null)
  const [idSelecionado, setIdSelecionado] = useState('')
  const [form, setForm] = useState(formInicial)

  useEffect(() => {
    getCertificados()
      .then(setCertificados)
      .catch(() => setErro(true))
      .finally(() => setLoading(false))
  }, [])

  const abrirAdicionar = () => { setForm(formInicial); setIdSelecionado(''); setModo('add') }
  const abrirEditar = () => { setIdSelecionado(''); setForm(formInicial); setModo('edit') }
  const abrirExcluir = () => { setIdSelecionado(''); setModo('delete') }
  const fechar = () => { setModo(null); setIdSelecionado(''); setForm(formInicial) }

  const selecionar = (id) => {
    setIdSelecionado(id)
    if (modo === 'edit') {
      const c = certificados.find(cert => String(cert.id) === String(id))
      if (c) setForm({ nome: c.nome, instituicao: c.instituicao, dataEmissao: c.dataEmissao, imagem: c.imagem })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modo === 'add') {
        const novo = await adicionarCertificado(form)
        setCertificados(prev => [...prev, novo])
      } else if (modo === 'edit' && idSelecionado) {
        const atualizado = await editarCertificado(Number(idSelecionado), form)
        setCertificados(prev => prev.map(c => c.id === atualizado.id ? atualizado : c))
      } else if (modo === 'delete' && idSelecionado) {
        await excluirCertificado(Number(idSelecionado))
        setCertificados(prev => prev.filter(c => c.id !== Number(idSelecionado)))
      }
      fechar()
    } catch {
      alert('Erro ao salvar. Verifique se a API está rodando.')
    }
  }

  const tituloModal = modo === 'add' ? 'Adicionar Certificado' : modo === 'edit' ? 'Editar Certificado' : 'Excluir Certificado'
  const itemSelecionado = certificados.find(c => String(c.id) === String(idSelecionado))
  const mostrarFormulario = modo === 'add' || (modo === 'edit' && idSelecionado)

  return (
    <section id="certificados" className={styles.main}>
      <h1 className={styles.pageTitle}>Meus Certificados</h1>

      {loading && <p style={{ textAlign: 'center', padding: '2rem', color: '#6d6d6d' }}>Carregando...</p>}
      {erro && <p style={{ textAlign: 'center', padding: '2rem', color: '#e05252' }}>Erro ao carregar. Verifique se a API está rodando.</p>}

      <div className={styles.containerCard}>
        {!loading && !erro && certificados.length === 0 && (
          <p className={styles.empty}>Nenhum certificado cadastrado ainda.</p>
        )}
        {certificados.map(cert => (
          <div key={cert.id} className={styles.card}>
            {cert.imagem && <img className={styles.imgCard} src={cert.imagem} alt={cert.nome} />}
            <h3>{cert.nome}</h3>
            <p>{cert.instituicao}</p>
            <p className={styles.date}>{cert.dataEmissao}</p>
          </div>
        ))}
      </div>

      <div className={styles.containerCRUD}>
        <button type="button" onClick={abrirAdicionar}>Adicionar Certificado</button>
        <button type="button" onClick={abrirEditar}>Editar Certificado</button>
        <button type="button" onClick={abrirExcluir}>Excluir Certificado</button>
      </div>

      <BaseModal isOpen={modo !== null} onClose={fechar} title={tituloModal}>
        <form className={modalStyles.form} onSubmit={handleSubmit}>
          {(modo === 'edit' || modo === 'delete') && (
            <div className={modalStyles.field}>
              <label className={modalStyles.label}>Selecione o certificado</label>
              <select className={modalStyles.select} value={idSelecionado} onChange={(e) => selecionar(e.target.value)} required>
                <option value="">-- Escolha --</option>
                {certificados.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          )}

          {modo === 'delete' && itemSelecionado && (
            <p className={modalStyles.confirmText}>
              Tem certeza que deseja excluir <span className={modalStyles.confirmHighlight}>{itemSelecionado.nome}</span>?
            </p>
          )}

          {mostrarFormulario && (
            <>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Nome do certificado</label>
                <input className={modalStyles.input} type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Instituição</label>
                <input className={modalStyles.input} type="text" value={form.instituicao} onChange={(e) => setForm({ ...form, instituicao: e.target.value })} required />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Data de emissão (MM/AAAA)</label>
                <input className={modalStyles.input} type="text" placeholder="12/2025" value={form.dataEmissao} onChange={(e) => setForm({ ...form, dataEmissao: e.target.value })} required />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>URL da imagem</label>
                <input className={modalStyles.input} type="url" placeholder="https://..." value={form.imagem} onChange={(e) => setForm({ ...form, imagem: e.target.value })} />
              </div>
            </>
          )}

          <div className={modalStyles.actions}>
            <button type="button" className={modalStyles.btnSecondary} onClick={fechar}>Cancelar</button>
            {modo === 'delete' ? (
              <button type="submit" className={modalStyles.btnDanger} disabled={!idSelecionado}>Excluir</button>
            ) : (
              <button type="submit" className={modalStyles.btnPrimary} disabled={modo === 'edit' && !idSelecionado}>Salvar</button>
            )}
          </div>
        </form>
      </BaseModal>
    </section>
  )
}

export default Certificates
