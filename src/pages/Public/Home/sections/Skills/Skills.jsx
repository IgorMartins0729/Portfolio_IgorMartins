import React, { useState } from 'react'
import styles from './Skills.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import { Network, Clock, BookOpen, Rocket, Compass, Star, Heart, Brain } from 'lucide-react'
import {
  getSkills,
  adicionarSkill,
  editarSkill,
  excluirSkill,
  ICONES_SOFT
} from '../../../../../services/skillService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

const ICONS_SOFT_MAP = { Network, Clock, BookOpen, Rocket, Compass, Star, Heart, Brain }

const formInicial = {
  nome: '',
  tipo: 'hard',
  icone: ''
}

function renderIconeSoft(nome) {
  const Icone = ICONS_SOFT_MAP[nome] || Star
  return <Icone />
}

function Skills() {
  const [skills, setSkills] = useState(() => getSkills())
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
      const s = skills.find(sk => String(sk.id) === String(id))
      if (s) {
        setForm({ nome: s.nome, tipo: s.tipo, icone: s.icone })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modo === 'add') {
      setSkills(adicionarSkill(form))
    } else if (modo === 'edit' && idSelecionado) {
      setSkills(editarSkill(Number(idSelecionado), form))
    } else if (modo === 'delete' && idSelecionado) {
      setSkills(excluirSkill(Number(idSelecionado)))
    }
    fechar()
  }

  const tituloModal =
    modo === 'add' ? 'Adicionar Habilidade' :
    modo === 'edit' ? 'Editar Habilidade' :
    modo === 'delete' ? 'Excluir Habilidade' : ''

  const itemSelecionado = skills.find(s => String(s.id) === String(idSelecionado))
  const mostrarFormulario = modo === 'add' || (modo === 'edit' && idSelecionado)

  const hardSkills = skills.filter(s => s.tipo === 'hard')
  const softSkills = skills.filter(s => s.tipo === 'soft')

  return (
    <section className={styles.main}>
      <h1 className={styles.pageTitle}>Minhas Habilidades</h1>

      <div className={styles.containerCard}>
        <div className={styles.card}>
          <h2 className={styles.titleCard}>Hard Skills</h2>
          <div className={styles.contentCardHard}>
            {hardSkills.map(skill => (
              <div key={skill.id} className={styles.itemHard}>
                {skill.icone && (
                  <img className={styles.imgItemHard} src={skill.icone} alt={skill.nome} />
                )}
                <h3>{skill.nome}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.titleCard}>Soft Skills</h2>
          <div className={styles.contentCardSoft}>
            {softSkills.map(skill => (
              <div key={skill.id} className={styles.itemSoft}>
                {renderIconeSoft(skill.icone)}
                <h3>{skill.nome}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.containerCRUD}>
        <button type="button" onClick={abrirAdicionar}>Adicionar Habilidade</button>
        <button type="button" onClick={abrirEditar}>Editar Habilidade</button>
        <button type="button" onClick={abrirExcluir}>Excluir Habilidade</button>
      </div>

      <BaseModal isOpen={modo !== null} onClose={fechar} title={tituloModal}>
        <form className={modalStyles.form} onSubmit={handleSubmit}>
          {(modo === 'edit' || modo === 'delete') && (
            <div className={modalStyles.field}>
              <label className={modalStyles.label}>Selecione a habilidade</label>
              <select
                className={modalStyles.select}
                value={idSelecionado}
                onChange={(e) => selecionar(e.target.value)}
                required
              >
                <option value="">-- Escolha --</option>
                {skills.map(s => (
                  <option key={s.id} value={s.id}>
                    [{s.tipo}] {s.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {modo === 'delete' && itemSelecionado && (
            <p className={modalStyles.confirmText}>
              Tem certeza que deseja excluir{' '}
              <span className={modalStyles.confirmHighlight}>{itemSelecionado.nome}</span>?
            </p>
          )}

          {mostrarFormulario && (
            <>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Nome</label>
                <input
                  className={modalStyles.input}
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>
              <div className={modalStyles.field}>
                <label className={modalStyles.label}>Tipo</label>
                <select
                  className={modalStyles.select}
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value, icone: '' })}
                >
                  <option value="hard">Hard Skill</option>
                  <option value="soft">Soft Skill</option>
                </select>
              </div>
              {form.tipo === 'hard' ? (
                <div className={modalStyles.field}>
                  <label className={modalStyles.label}>URL do ícone</label>
                  <input
                    className={modalStyles.input}
                    type="url"
                    placeholder="https://..."
                    value={form.icone}
                    onChange={(e) => setForm({ ...form, icone: e.target.value })}
                  />
                </div>
              ) : (
                <div className={modalStyles.field}>
                  <label className={modalStyles.label}>Ícone</label>
                  <select
                    className={modalStyles.select}
                    value={form.icone}
                    onChange={(e) => setForm({ ...form, icone: e.target.value })}
                    required
                  >
                    <option value="">-- Escolha um ícone --</option>
                    {ICONES_SOFT.map(nome => (
                      <option key={nome} value={nome}>{nome}</option>
                    ))}
                  </select>
                </div>
              )}
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

export default Skills
