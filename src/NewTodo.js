import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'

const NewTodo = ({
  item, deletetodo, editelement, editstate, edittext, saveedit,
  statechange, donetodo, donetodotext
}) => {
  const checked = donetodotext.filter(
    donetodotext => donetodotext.id === item.id
  )
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {editstate && edittext.id === item.id ? (
          <TextInput
            placeholder='Edit'
            style={styles.editItemInput}
            onChangeText={statechange}
          />
        ) : (
          <Text
            onPress={() => donetodo(item.id, item.text)}
            style={
              checked.length ? styles.checkedItemText : styles.listItemText
            }
          >
            {item.text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 13,
    backgroundColor: 'deepskyblue',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    fontSize: 14
  },
  checkedItemText: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'green'
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 67
  },
  editItemInput: {
    padding: 1,
    fontSize: 14
  }
})

export default NewTodo
