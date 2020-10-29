import React, { useState, useEffect } from 'react'
import api from './services/api'

import Header from './components/Header'

import './App.css'
// import backgroundImage from './assets/background.jpg'

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  /**
   * useState retorna um array com duas posições
   * 1 - Variável com seu valor inicial
   * 2 - Função para atualizar este valor
   */

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`)

    // setProjects([...projects, `Novo Projeto ${Date.now()}`])

    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Diego Fernandes"
    })

    const project = response.data

    setProjects([...projects, project])

    // console.log(projects) 
  }

  return (
    <>
      <Header title="Projects" />

      {/* <img width={300} src={backgroundImage} /> */}

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App