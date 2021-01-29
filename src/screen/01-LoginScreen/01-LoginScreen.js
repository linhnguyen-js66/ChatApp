import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-elements'
import styles from './style'
import AuthInput from '../../components/AuthInput'
import ButtonForm from '../../components/ButtonForm';
import { useNavigation } from '@react-navigation/native'
const LoginScreen01 = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("sontungmtp@gmail.com")
    const [password, setPassword] = useState("123456")
    const [loading, setLoading] = useState(false)
    const signInWithEmailAndPassword = async (email,password) => {
        if(email == "" || password == ""){
            Alert.alert("Thông báo","Thông tin đăng nhập trống")
        }
        else{
            setLoading(true)
            await auth().signInWithEmailAndPassword(email,password)
            .then(async ()=>{
                await auth().onAuthStateChanged((user)=>{
                    console.log(user)
                    if(user !== null){
                        navigation.navigate('Home')
                    }
                })
            })
            .catch(error => {
                setLoading(false)
                  Alert.alert("Error",`${error}`)
            })
        }
    }
    return (
        <View>
            {/**Header của LoginScreen */}
            {loading == false && 
               <View>
                      <View style={styles.head}>
                <Text style={styles.login}>Login</Text>
                <View style={styles.containChatApptext}>
                    <Text style={styles.textChatapp}>ChatApp</Text>
                    <Icon name="chat" type="entypo" size={30} />
                </View>
            </View>
            {/**Phần textInput email và password */}
            <View style={styles.AuthInput}>
                <AuthInput title="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <AuthInput title="Password"
                    onChangeText={(text) => setPassword(text)}
                    isPassword={true}
                    value={password}
                />
            </View>
            <View style={styles.Button}>
                <ButtonForm title="Đăng nhập" onPress={() => signInWithEmailAndPassword(email,password)} />
            </View>
            <TouchableOpacity style={styles.signUpNavigation}
                onPress={() => {
                    navigation.navigate("SignUp")
                }}
            >
                <Text style={styles.textsignUpNavigation}>Đăng ký tài khoản?</Text>
                <Icon name="arrowright" type="antdesign" color="#595959" />
            </TouchableOpacity>
               </View>
            }
        </View>
    )
}

export default LoginScreen01