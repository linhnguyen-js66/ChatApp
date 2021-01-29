import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import styles from './style'

const AuthInput = ({title, value, placeHolder, onChangeText,isPassword}) => {
    return(
      <View>
           <Text style={styles.text}>{title}</Text>
           <TextInput
           value={value}
           placeholder={placeHolder}
           onChangeText={onChangeText}
           style={styles.input}
           secureTextEntry={isPassword}
           />
      </View>
    )
}

export default AuthInput