import React, { useState } from 'react'

import Header from './components/Header'

import './App.css'
import backgroundImage from './assets/background.jpg'

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {

  const [projects, setProjects] = useState(['Desenvolvimento de app', 'Frontend web'])

  /**
   * useState retorna um array com duas posições
   * 1 - Variável com seu valor inicial
   * 2 - Função para atualizar este valor
   */

  function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`)
    
    setProjects([ ... projects, `Novo Projeto ${Date.now()}`])

    // console.log(projects) 
  }

  return (
    <>
      <Header title="Projects" />

      <img width={300} src={backgroundImage} />

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App