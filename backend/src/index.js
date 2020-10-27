const express = require('express')

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

app.get('/projects', (request, response) => {
  const { title, owner } = request.query

  console.log(title)
  console.log(owner)

  return response.json([
    'Projeto 1',
    'Projeto 2'
  ])
})

app.post('/projects', (request, response) => {
  const body = request.body

  console.log(body)

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projects 3'
  ])
})

app.put('/projects/:id', (request, response) => {
  const params = request.params

  console.log(params)

  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3'
  ])
})

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 4',
    'Projeto 2'
  ])
})

app.listen(3333, () => {
  console.log('😃Backend Started')
})