import { Router } from 'express'
import db from '../db.js'

const router = Router()

const validarId = (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erro: 'ID inválido' })
    return null
  }
  return id
}

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cursos')
    res.json(rows.map(r => ({ ...r, isCompleted: !!r.isCompleted })))
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { nomeCurso, localCurso, inicioCurso, fimCurso, isCompleted } = req.body
    if (!nomeCurso) return res.status(400).json({ erro: 'nomeCurso é obrigatório' })
    const [result] = await db.query(
      'INSERT INTO cursos (nomeCurso, localCurso, inicioCurso, fimCurso, isCompleted) VALUES (?, ?, ?, ?, ?)',
      [nomeCurso, localCurso ?? '', inicioCurso ?? '', fimCurso ?? '', isCompleted ? 1 : 0]
    )
    res.status(201).json({ id: result.insertId, nomeCurso, localCurso: localCurso ?? '', inicioCurso: inicioCurso ?? '', fimCurso: fimCurso ?? '', isCompleted: !!isCompleted })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    const { nomeCurso, localCurso, inicioCurso, fimCurso, isCompleted } = req.body
    if (!nomeCurso) return res.status(400).json({ erro: 'nomeCurso é obrigatório' })
    await db.query(
      'UPDATE cursos SET nomeCurso=?, localCurso=?, inicioCurso=?, fimCurso=?, isCompleted=? WHERE id=?',
      [nomeCurso, localCurso ?? '', inicioCurso ?? '', fimCurso ?? '', isCompleted ? 1 : 0, id]
    )
    res.json({ id, nomeCurso, localCurso: localCurso ?? '', inicioCurso: inicioCurso ?? '', fimCurso: fimCurso ?? '', isCompleted: !!isCompleted })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    await db.query('DELETE FROM cursos WHERE id=?', [id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

export default router
