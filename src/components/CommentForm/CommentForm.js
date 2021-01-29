import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import styles from './style'

const CommentForm = ({source,placeHolder,value, onChangeText,on}) => {
  return(
      <View style={styles.contain}>
          <Image source={source} style={styles.avata}/>
          <View style={styles.containTextInput}>
              <TextInput
               placeholder={placeHolder}
               value={value}
               onChangeText={onChangeText}
               style={styles.input}
               multiline={true}
               autoFocus={on}
              
              />
          </View>
      </View>
  )
}
export default CommentForm