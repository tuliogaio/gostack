const express = require('express')
const { uuid } = require('uuidv4')

const app = express()

/** 
 * Necessário para processar request e response JSON
 * Deve ser inserido antes das rotas
 */
app.use(express.json())

/**
 * Métodos HTTP
 * 
 * GET: Buscar informações no Backend
 * POST: Criar informações no Backend
 * PUT/PATCH: Alterar informações no Backend
 * DELETE: Deletar informações no Backend
 */

/**
 * Tipos de Parâmetros
 * Query Params: Filtros e Paginação 
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Rquest Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

const projects = []

app.get('/projects', (request, response) => {
  const { title } = request.query

  const results = title ? projects.filter(project => project.title.includes(title)) : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body
  const project = { id: uuid(), title, owner }

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project Not Found' })
  }

  const project = {
    id,
    title,
    owner
  }

  project[projectIndex] = project

  return response.json(project)

})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project Not Found' })
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('😃Backend Started')
})