import React, { useState } from 'react'
import styles from './Academic.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import iconStudy from '../../../../../assets/Group2.svg'
import iconLoading from '../../../../../assets/Vector3.svg'
import iconCheck from '../../../../../assets/4.svg'
import {
  getCursos,
  adicionarCurso,
  editarCurso,
  excluirCurso
} from '../../../../../services/cursoService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

const formInicial = {
  nomeCurso: '',
  localCurso: '',
  inicioCurso: '',
  fimCurso: '',
  isCompleted: false
}

function Academic() {
  const [meusCursos, setMeusCursos] = useState(() => getCursos())
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

  const selecionarCurso = (id) => {
    setIdSelecionado(id)
    if (modo === 'edit') {
      const curso = meusCursos.find(c => String(c.id) === String(id))
      if (curso) {
        setForm({
          nomeCurso: curso.nomeCurso,
          localCurso: curso.localCurso,
          inicioCurso: curso.inicioCurso,
          fimCurso: curso.fimCurso,
          isCompleted: curso.isCompleted
        })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modo === 'add') {
      setMeusCursos(adicionarCurso(form))
    } else if (modo === 'edit' && idSelecionado) {
      setMeusCursos(editarCurso(Number(idSelecionado), form))
    } else if (modo === 'delete' && idSelecionado) {
      setMeusCursos(excluirCurso(Number(idSelecionado)))
    }
    fechar()
  }

  const tituloModal =
    modo === 'add' ? 'Adicionar Formação Acadêmica' :
    modo === 'edit' ? 'Editar Formação Acadêmica' :
    modo === 'delete' ? 'Excluir Formação Acadêmica' : ''

  const cursoSelecionado = meusCursos.find(c => String(c.id) === String(idSelecionado))
  const mostrarFormulario = modo === 'add' || (modo === 'edit' && idSelecionado)

  return (
    <section className={styles.main}>
      <h1 className={styles.pageTitle}>Formação Acadêmica</h1>

      <div className={styles.containerCard}>
        {meusCursos.map(curso => (
          <div key={curso.id} className={styles.card}>
            <div className={styles.leftCard}>
              <img className={styles.firstIcon} src={iconStudy} alt="Ícone de formação" />
              <img
                className={styles.secondIcon}
                src={curso.isCompleted ? iconCheck : iconLoading}
                alt={curso.isCompleted ? 'Concluído' : 'Em andamento'}
              />
            </div>

            <div className={styles.rightCard}>
              <h2 className={styles.nameCourse}>{curso.nomeCurso}</h2>
              <p className={styles.localCourse}>{curso.localCurso}</p>
              <p className={styles.periodCourse}>
                Início: {curso.inicioCurso} - Fim: {curso.fimCurso}
              </p>
            </div>
          </div>
        ))}

        <div className={styles.containerCRUD}>
          <button type="button" onClick={abrirAdicionar}>Adicionar nova Formação Acadêmica</button>
          <button type="button" onClick={abrirEditar}>Editar Formação Acadêmica</button>
          <button type="button" onClick={abrirExcluir}>Excluir Formação Acadêmica</button>
        </div>
      </div>

      <BaseModal isOpen={modo !== null} onClose={fechar} title={tituloModal}>
        <form className={modalStyles.form} onSubmit={handleSubmit}>
          {(modo === 'edit' || modo === 'delete') && (
            <div className={modalStyles.field}>
              <label className={modalStyles.label}>Selecione a formação</label>
              <select
                className={modalStyles.select}
                value={idSelecionado}
                onChange={(e) => selecionarCurso(e.target.value)}
                required
              >
                <option value="">-- Escolha --</option>
                {meusCursos.map(c => (
                  <option key={c.id} value={c.id}>{c.nomeCurso}</option>
                ))}
              </select>
            </div>
          )}

          {modo === 'delete' && cursoSelecionado && (
            <p className={modalStyles.confirmText}>
              Tem certeza que deseja excluir{' '}
              <span className={modalStyles.confirmHighlight}>{cursoSelecionado.nomeCurso}</span>?
            </p>
          )}

          {mostrarFormulario && (
            <>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Nome do curso</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  value={form.nomeCurso}
                  onChange={(e) => setForm({ ...form, nomeCurso: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Instituição</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  value={form.localCurso}
                  onChange={(e) => setForm({ ...form, localCurso: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Início (MM/AAAA)</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  placeholder="08/2025"
                  value={form.inicioCurso}
                  onChange={(e) => setForm({ ...form, inicioCurso: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Fim (MM/AAAA)</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  placeholder="07/2028"
                  value={form.fimCurso}
                  onChange={(e) => setForm({ ...form, fimCurso: e.target.value })}
                  required
                />
              </div>
              <div className={`${modalStyles.field} ${modalStyles.checkboxField}`}>
                <input
                  id="academic-completed"
                  type="checkbox"
                  checked={form.isCompleted}
                  onChange={(e) => setForm({ ...form, isCompleted: e.target.checked })}
                />
                <label htmlFor="academic-completed" className={modalStyles.label}>
                  Curso concluído
                </label>
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

export default Academic
