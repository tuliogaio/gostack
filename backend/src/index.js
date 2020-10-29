const express = require('express')
const { uuid, isUuid } = require('uuidv4')
const cors = require('cors')

const app = express()

/** 
 * Necessário para processar request e response JSON
 * Deve ser inserido antes das rotas
 */
app.use(cors())
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

/**
 * Middleware:
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados dela
 * 
 */

const projects = []

const logRequest = (request, response, next) => {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  // console.log('1')
  console.log(logLabel)

  //return next()

  console.time(logLabel)

  next()

  // console.log('2')
  console.timeEnd(logLabel)
}

const validateProjectId = (request, response, next) => {
  const { id } = request.params
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Project ID.' })
  }

  return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectId)

app.get('/projects', /*logRequest,*/(request, response) => {
  // console.log('3')  
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

app.put('/projects/:id', /*validateProjectId,*/(request, response) => {
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

  projects[projectIndex] = project

  return response.json(project)

})

app.delete('/projects/:id', /*validateProjectId,*/(request, response) => {
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