import React, { useState } from 'react'
import styles from './Projects.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import {
  getProjetos,
  adicionarProjeto,
  editarProjeto,
  excluirProjeto
} from '../../../../../services/projetoService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

const formInicial = {
  titulo: '',
  descricao: '',
  tecnologias: '',
  imagem: '',
  link: ''
}

function Projects() {
  const [projetos, setProjetos] = useState(() => getProjetos())
  const [modo, setModo] = useState(null)
  const [idSelecionado, setIdSelecionado] = useState('')
  const [form, setForm] = useState(formInicial)

  const abrirAdicionar = () => {
    setForm(formInicial)
    setIdSelecionado('')
    setModo('add')
  }

  const abrirEditar = () => {
    setIdSelecionado('')
    setForm(formInicial)
    setModo('edit')
  }

  const abrirExcluir = () => {
    setIdSelecionado('')
    setModo('delete')
  }

  const fechar = () => {
    setModo(null)
    setIdSelecionado('')
    setForm(formInicial)
  }

  const selecionar = (id) => {
    setIdSelecionado(id)
    if (modo === 'edit') {
      const proj = projetos.find(p => String(p.id) === String(id))
      if (proj) {
        setForm({
          titulo: proj.titulo,
          descricao: proj.descricao,
          tecnologias: proj.tecnologias,
          imagem: proj.imagem,
          link: proj.link || ''
        })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modo === 'add') {
      setProjetos(adicionarProjeto(form))
    } else if (modo === 'edit' && idSelecionado) {
      setProjetos(editarProjeto(Number(idSelecionado), form))
    } else if (modo === 'delete' && idSelecionado) {
      setProjetos(excluirProjeto(Number(idSelecionado)))
    }
    fechar()
  }

  const tituloModal =
    modo === 'add' ? 'Adicionar Projeto' :
    modo === 'edit' ? 'Editar Projeto' :
    modo === 'delete' ? 'Excluir Projeto' : ''

  const itemSelecionado = projetos.find(p => String(p.id) === String(idSelecionado))
  const mostrarFormulario = modo === 'add' || (modo === 'edit' && idSelecionado)

  return (
    <section className={styles.main}>
      <h1 className={styles.pageTitle}>Meus Projetos</h1>

      <div className={styles.containerCard}>
        {projetos.map(projeto => (
          <div key={projeto.id} className={styles.card}>
            {projeto.imagem && (
              <img className={styles.imgCard} src={projeto.imagem} alt={projeto.titulo} />
            )}
            <h2>{projeto.titulo}</h2>
            <p>{projeto.descricao}</p>
            <div className={styles.tagsTech}>
              <span className={styles.tags}>{projeto.tecnologias}</span>
            </div>

            <div className={styles.btnCard}>
              {projeto.link ? (
                <a href={projeto.link} target="_blank" rel="noopener noreferrer">
                  <button type="button">Ver repositório</button>
                </a>
              ) : (
                <button type="button" disabled>Ver repositório</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.containerCRUD}>
        <button type="button" onClick={abrirAdicionar}>Adicionar novo Projeto</button>
        <button type="button" onClick={abrirEditar}>Editar Projeto</button>
        <button type="button" onClick={abrirExcluir}>Excluir Projeto</button>
      </div>

      <BaseModal isOpen={modo !== null} onClose={fechar} title={tituloModal}>
        <form className={modalStyles.form} onSubmit={handleSubmit}>
          {(modo === 'edit' || modo === 'delete') && (
            <div className={modalStyles.field}>
              <label className={modalStyles.label}>Selecione o projeto</label>
              <select
                className={modalStyles.select}
                value={idSelecionado}
                onChange={(e) => selecionar(e.target.value)}
                required
              >
                <option value="">-- Escolha --</option>
                {projetos.map(p => (
                  <option key={p.id} value={p.id}>{p.titulo}</option>
                ))}
              </select>
            </div>
          )}

          {modo === 'delete' && itemSelecionado && (
            <p className={modalStyles.confirmText}>
              Tem certeza que deseja excluir{' '}
              <span className={modalStyles.confirmHighlight}>{itemSelecionado.titulo}</span>?
            </p>
          )}

          {mostrarFormulario && (
            <>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Título</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Descrição</label>
                <textarea
                  className={modalStyles.textarea}
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Tecnologias</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  placeholder="React, Node.js"
                  value={form.tecnologias}
                  onChange={(e) => setForm({ ...form, tecnologias: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>URL da imagem</label>
                <input
                  className={modalStyles.input}
                  type="url"
                  placeholder="https://..."
                  value={form.imagem}
                  onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Link do repositório</label>
                <input
                  className={modalStyles.input}
                  type="url"
                  placeholder="https://github.com/..."
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>
            </>
          )}

          <div className={modalStyles.actions}>
            <button type="button" className={modalStyles.btnSecondary} onClick={fechar}>
              Cancelar
            </button>
            {modo === 'delete' ? (
              <button
                type="submit"
                className={modalStyles.btnDanger}
                disabled={!idSelecionado}
              >
                Excluir
              </button>
            ) : (
              <button
                type="submit"
                className={modalStyles.btnPrimary}
                disabled={modo === 'edit' && !idSelecionado}
              >
                Salvar
              </button>
            )}
          </div>
        </form>
      </BaseModal>
    </section>
  )
}

export default Projects
