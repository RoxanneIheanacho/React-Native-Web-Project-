import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import NewTodo from './NewTodo'
import NewText from './NewText'
import uuid from 'uuid'

const Details = () => {
  const [item, setTodos] = useState([
    {
    }
  ])

  const [editStatus, editStatusChange] = useState(false)

  const [edittext, edittextChange] = useState({
    id: null,
    text: null
  })

  const [donetodotext, donetodotextChange] = useState([])

  const deletetodo = id => {
    setTodos(prevItems => {
      return prevItems.filter(todo => item.id !== id)
    })
  }

  const saveedit = (id, text) => {
    setTodos(prevItems => {
      return prevItems.map(todo =>
        item.id === edittext.id ? { id, text: edittext.text } : item
      )
    })
    editStatusChange(!editStatus)
  }

  const statechange = text => {
    edittextChange({ id: edittext.id, text })
  }

  const newText = text => {
    if (text) {
      setTodos(prevItems => {
        return [{ id: uuid(), text }, ...prevItems]
      })
    }
  }

  const editelement = (id, text) => {
    edittextChange({
      id,
      text
    })
    return editStatusChange(!editStatus)
  }

  const donetodo = (id, text) => {
    const isChecked = donetodotext.filter(donetodotext => donetodotext.id === id)
    isChecked.length
      ? donetodotextChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id)]
      })
      : donetodotextChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id), { id, text }]
      })
  }

  return (
    <View style={styles.container}>
      <NewText newText={newText} />
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <NewTodo
            item={item}
            deletetodo={deletetodo}
            editelement={editelement}
            editstate={editStatus}
            edittext={edittext}
            saveedit={saveedit}
            statechange={statechange}
            donetodo={donetodo}
            donetodotext={donetodotext}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'pink'
  }
})

export default Details
