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
    const [rows] = await db.query('SELECT * FROM certificados')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { nome, instituicao, dataEmissao, imagem } = req.body
    if (!nome) return res.status(400).json({ erro: 'nome é obrigatório' })
    const [result] = await db.query(
      'INSERT INTO certificados (nome, instituicao, dataEmissao, imagem) VALUES (?, ?, ?, ?)',
      [nome, instituicao ?? '', dataEmissao ?? '', imagem ?? '']
    )
    res.status(201).json({ id: result.insertId, nome, instituicao: instituicao ?? '', dataEmissao: dataEmissao ?? '', imagem: imagem ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    const { nome, instituicao, dataEmissao, imagem } = req.body
    if (!nome) return res.status(400).json({ erro: 'nome é obrigatório' })
    await db.query(
      'UPDATE certificados SET nome=?, instituicao=?, dataEmissao=?, imagem=? WHERE id=?',
      [nome, instituicao ?? '', dataEmissao ?? '', imagem ?? '', id]
    )
    res.json({ id, nome, instituicao: instituicao ?? '', dataEmissao: dataEmissao ?? '', imagem: imagem ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    await db.query('DELETE FROM certificados WHERE id=?', [id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

export default router
