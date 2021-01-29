import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-elements'
import styles from './style'
import AuthInput from '../../components/AuthInput'
import ButtonForm from '../../components/ButtonForm';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

const SignUpScreen02 = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const signUpWithEmailAndPassword = async (email,password,username) => {
        if(email == "" || password == "" || username == ""){
            Alert.alert("Thông báo","Thông tin đăng kí còn trống")
        }
        else{
            setLoading(true)
            await auth().createUserWithEmailAndPassword(email,password)
            .then(async ()=>{
                await auth().currentUser.updateProfile({
                    displayName: username
                })
                const uid = await auth().currentUser.uid;
                await firestore().collection('UserInformation').doc(uid).set({
                    name: username,
                    email: email,
                    id: uid,
                })
                navigation.navigate('Login')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Thông báo","Email đã được sử dụng")
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    Alert.alert("Thông báo","Địa chỉ email không hợp lệ")
                  }
                  console.log(error)
            })
        }
    }
    return (
        <View>
            <View style={styles.containChatApptext}>
                <Text style={styles.textChatapp}>ChatApp</Text>
                <Icon name="chat" type="entypo" size={30} />
            </View>
            <View style={styles.AuthInput}>
                <AuthInput title="Name"
                    value={userName}
                    onChangeText={(text) => setUserName(text)} />
                <AuthInput title="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <AuthInput title="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                    isPassword={true}
                    />
            </View>
            <View style={styles.Button}>
                <ButtonForm title="Đăng kí" onPress={() => signUpWithEmailAndPassword(email,password,userName)} />
            </View>
        </View>
    )
}
export default SignUpScreen02