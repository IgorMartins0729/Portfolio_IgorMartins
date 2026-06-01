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
    const [rows] = await db.query('SELECT * FROM projetos')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, tecnologias, imagem, link } = req.body
    if (!titulo) return res.status(400).json({ erro: 'titulo é obrigatório' })
    const [result] = await db.query(
      'INSERT INTO projetos (titulo, descricao, tecnologias, imagem, link) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao ?? '', tecnologias ?? '', imagem ?? '', link ?? '']
    )
    res.status(201).json({ id: result.insertId, titulo, descricao: descricao ?? '', tecnologias: tecnologias ?? '', imagem: imagem ?? '', link: link ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    const { titulo, descricao, tecnologias, imagem, link } = req.body
    if (!titulo) return res.status(400).json({ erro: 'titulo é obrigatório' })
    await db.query(
      'UPDATE projetos SET titulo=?, descricao=?, tecnologias=?, imagem=?, link=? WHERE id=?',
      [titulo, descricao ?? '', tecnologias ?? '', imagem ?? '', link ?? '', id]
    )
    res.json({ id, titulo, descricao: descricao ?? '', tecnologias: tecnologias ?? '', imagem: imagem ?? '', link: link ?? '' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = validarId(req, res)
    if (!id) return
    await db.query('DELETE FROM projetos WHERE id=?', [id])
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

export default router
