import React, { useState, useEffect } from 'react'
import styles from './AboutMe.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import {
  getExperiencias,
  adicionarExperiencia,
  editarExperiencia,
  excluirExperiencia
} from '../../../../../services/experienciaService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

const formInicial = { nomeEmpresa: '', cargo: '', periodo: '' }

function AboutMe() {
  const [experiencias, setExperiencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(false)
  const [modo, setModo] = useState(null)
  const [idSelecionado, setIdSelecionado] = useState('')
  const [form, setForm] = useState(formInicial)

  useEffect(() => {
    getExperiencias()
      .then(setExperiencias)
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
      const exp = experiencias.find(e => String(e.id) === String(id))
      if (exp) setForm({ nomeEmpresa: exp.nomeEmpresa, cargo: exp.cargo, periodo: exp.periodo })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modo === 'add') {
        const nova = await adicionarExperiencia(form)
        setExperiencias(prev => [...prev, nova])
      } else if (modo === 'edit' && idSelecionado) {
        const atualizada = await editarExperiencia(Number(idSelecionado), form)
        setExperiencias(prev => prev.map(e => e.id === atualizada.id ? atualizada : e))
      } else if (modo === 'delete' && idSelecionado) {
        await excluirExperiencia(Number(idSelecionado))
        setExperiencias(prev => prev.filter(e => e.id !== Number(idSelecionado)))
      }
      fechar()
    } catch {
      alert('Erro ao salvar. Verifique se a API está rodando.')
    }
  }

  const tituloModal = modo === 'add' ? 'Adicionar Experiência' : modo === 'edit' ? 'Editar Experiência' : 'Excluir Experiência'
  const itemSelecionado = experiencias.find(e => String(e.id) === String(idSelecionado))
  const mostrarFormulario = modo === 'add' || (modo === 'edit' && idSelecionado)

  return (
    <section id="sobre-mim" className={styles.main}>
      <h1 className={styles.pageTitle}>Sobre mim e Experiência Profissional</h1>

      <div className={styles.container}>
        <div className={styles.containerContent}>
          <h2 className={styles.sectionTitle}>Meus Objetivos</h2>
          <div className={styles.textArea}>
            <p className={styles.description}>Meu nome é Igor e sou estudante na área de tecnologia, com interesse em desenvolvimento.
              Tenho experiência com linguagens de programação, versionamento com Git e criação de interfaces
              focadas em usabilidade e experiência do usuário. Busco sempre aprimorar minhas habilidades
              por meio de projetos acadêmicos e aplicando na prática o que aprendo durante minha formação
              na FATEC São José dos Campos.
            </p>
          </div>
        </div>

        <div className={styles.containerContent}>
          <h2 className={styles.sectionTitle}>Experiência Profissional</h2>

          {loading && <p style={{ color: '#6d6d6d', fontSize: '0.9rem' }}>Carregando...</p>}
          {erro && <p style={{ color: '#e05252', fontSize: '0.9rem' }}>Erro ao carregar. Verifique se a API está rodando.</p>}

          <div className={styles.content}>
            {experiencias.map(exp => (
              <article key={exp.id} className={styles.experienceItem}>
                <h3 className={styles.companyName}>{exp.nomeEmpresa}</h3>
                <p className={styles.role}>{exp.cargo}</p>
                <time className={styles.period}>{exp.periodo}</time>
              </article>
            ))}
          </div>

          <div className={styles.containerCRUD}>
            <button type="button" onClick={abrirAdicionar}>Adicionar Experiência</button>
            <button type="button" onClick={abrirEditar}>Editar Experiência</button>
            <button type="button" onClick={abrirExcluir}>Excluir Experiência</button>
          </div>
        </div>
      </div>

      <BaseModal isOpen={modo !== null} onClose={fechar} title={tituloModal}>
        <form className={modalStyles.form} onSubmit={handleSubmit}>
          {(modo === 'edit' || modo === 'delete') && (
            <div className={modalStyles.field}>
              <label className={modalStyles.label}>Selecione a experiência</label>
              <select className={modalStyles.select} value={idSelecionado} onChange={(e) => selecionar(e.target.value)} required>
                <option value="">-- Escolha --</option>
                {experiencias.map(e => <option key={e.id} value={e.id}>{e.nomeEmpresa} — {e.cargo}</option>)}
              </select>
            </div>
          )}

          {modo === 'delete' && itemSelecionado && (
            <p className={modalStyles.confirmText}>
              Tem certeza que deseja excluir <span className={modalStyles.confirmHighlight}>{itemSelecionado.nomeEmpresa} — {itemSelecionado.cargo}</span>?
            </p>
          )}

          {mostrarFormulario && (
            <>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Empresa</label>
                <input className={modalStyles.input} type="text" value={form.nomeEmpresa} onChange={(e) => setForm({ ...form, nomeEmpresa: e.target.value })} required />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Cargo</label>
                <input className={modalStyles.input} type="text" value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} required />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Período</label>
                <input className={modalStyles.input} type="text" placeholder="Mar 2024 - Jun 2025" value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} required />
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

export default AboutMe
