import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'

const NewText = ({ newText }) => {
  const [text, setText] = useState('')
  const onChange = textValue => setText(textValue)

  return (
    <View>
      <TextInput
        placeholder='Add new to do element'
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          newText(text)
          setText('new text')
        }}
      >
        <Text style={styles.btnText}>
          [Add]
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 34,
    padding: 6,
    margin: 6
  },
  btn: {
    backgroundColor: 'blue',
    width: 200,
    padding: 4,
    margin: 4
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center'
  }
})

export default NewText
