import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import React, { useState } from 'react'

const LikeCommentDirect = ({name,onPress,type,style}) => {
    return(
            <TouchableOpacity onPress={onPress} style={{marginLeft:16}}>
                  <Icon name={name} type={type} style={style}/>
            </TouchableOpacity>
    )
}
export default LikeCommentDirect