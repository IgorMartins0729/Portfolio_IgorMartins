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
    const [rows] = await db.query('SELECT * FROM experiencias')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { nomeEmpresa, cargo, periodo } = req.body
    if (!nomeEmpresa) return res.status(400).json({ erro: 'nomeEmpresa é obrigatório' })
    const [result] = await db.query(
      'INSERT INTO experiencias (nomeEmpresa, cargo, periodo) VALUES (?, ?, ?)',
      [nomeEmpresa, cargo ?? '', periodo ?? '']
    )
    res.status(201).json({ id: result.insertId, nomeEmpresa, cargo: cargo ?? '', periodo: periodo ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    const { nomeEmpresa, cargo, periodo } = req.body
    if (!nomeEmpresa) return res.status(400).json({ erro: 'nomeEmpresa é obrigatório' })
    await db.query(
      'UPDATE experiencias SET nomeEmpresa=?, cargo=?, periodo=? WHERE id=?',
      [nomeEmpresa, cargo ?? '', periodo ?? '', id]
    )
    res.json({ id, nomeEmpresa, cargo: cargo ?? '', periodo: periodo ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    await db.query('DELETE FROM experiencias WHERE id=?', [id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

export default router
