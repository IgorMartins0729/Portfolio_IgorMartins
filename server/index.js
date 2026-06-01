import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import projetosRouter from './routes/projetos.js'
import skillsRouter from './routes/skills.js'
import certificadosRouter from './routes/certificados.js'
import cursosRouter from './routes/cursos.js'
import experienciasRouter from './routes/experiencias.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/projetos', projetosRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/certificados', certificadosRouter)
app.use('/api/cursos', cursosRouter)
app.use('/api/experiencias', experienciasRouter)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
