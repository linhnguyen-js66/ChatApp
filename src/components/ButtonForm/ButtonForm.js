import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import styles from './style'

const ButtonForm = ({onPress, title}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
              <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
export default ButtonForm