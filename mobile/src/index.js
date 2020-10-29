import React, { useEffect, useState } from 'react'
import { /*ScrollView, View,*/ SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api'

/**
 * Tags não possuem valor semântico
 * Não possuem estilização própria
 * Todos os componentes posseum por padrão display: flex
 * Não há herança de estilos entre os componentes
 * 
 * View: div, footer, header, main, aside, section
 * Text: p, span, strong, h1, h2, h3
 * 
 * - react-native init mobile
 * - yarn add axios
 */

export default function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Túlio Gaio'
    })

    setProjects([...projects, response.data])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity activeOpacity={0, 6} style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/* <View style={styles.container}>
        {projects.map(project => (
          <Text key={project.id} style={styles.title}>{project.title}</Text>
        ))}
      </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }

})