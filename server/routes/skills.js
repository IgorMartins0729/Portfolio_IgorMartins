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
    const [rows] = await db.query('SELECT * FROM skills')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { nome, tipo, icone } = req.body
    if (!nome || !tipo) return res.status(400).json({ erro: 'nome e tipo são obrigatórios' })
    const [result] = await db.query(
      'INSERT INTO skills (nome, tipo, icone) VALUES (?, ?, ?)',
      [nome, tipo, icone ?? '']
    )
    res.status(201).json({ id: result.insertId, nome, tipo, icone: icone ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    const { nome, tipo, icone } = req.body
    if (!nome || !tipo) return res.status(400).json({ erro: 'nome e tipo são obrigatórios' })
    await db.query(
      'UPDATE skills SET nome=?, tipo=?, icone=? WHERE id=?',
      [nome, tipo, icone ?? '', id]
    )
    res.json({ id, nome, tipo, icone: icone ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    await db.query('DELETE FROM skills WHERE id=?', [id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

export default router
