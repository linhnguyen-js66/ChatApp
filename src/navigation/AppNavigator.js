import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen01 from '../screen/01-LoginScreen'
import SignUpScreen02 from '../screen/02-SignUp-Screen'
import ChatScreen03 from '../screen/03-ChatScreen'
import CommentScreen04 from '../screen/04-CommentScreen'

const Stack = createStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}
const AuthScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen01} />
            <Stack.Screen name="SignUp" component={SignUpScreen02}/>
        </Stack.Navigator>
    )
}

const HomeScreen = () => {
    return(
        <Stack.Navigator
        initialRouteName="Chat"
        screenOptions={{headerShown:false}}
        >
             <Stack.Screen name="Chat" component={ChatScreen03}/>
             <Stack.Screen name="Comment" component={CommentScreen04}/>
        </Stack.Navigator>
    )
}

export const AppNavigator = () => <NavigationContainer>{AppStack()}</NavigationContainer>