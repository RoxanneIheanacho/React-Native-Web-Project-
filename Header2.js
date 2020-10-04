import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header2 = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}> Today's Activities
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    padding: 16,
    width: 700,
    backgroundColor: 'blue'
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    backgroundColor: 'blue'
  }
})

export default Header2
