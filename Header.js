import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}> AND...WE'RE LIVE!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    padding: 16,
    width: 700,
    backgroundColor: 'blue'
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    backgroundColor: 'blue'
  }
})

export default Header
