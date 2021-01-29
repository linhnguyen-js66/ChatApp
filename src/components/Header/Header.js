import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import style from './style'

const Header = ({source,title,user,onPress}) => {
    return(
        <View style={style.contain}>
            <TouchableOpacity style={{justifyContent:'center',marginLeft:8}} onPress={onPress}>
                 <Icon name="left" type="antdesign" />
            </TouchableOpacity>
            
             <View style={style.containtitle}>
                 <Text style={style.user}>{user}</Text>
                 <Text style={style.title}>{title}</Text>
             </View>
        </View>
    )
}
export default Header