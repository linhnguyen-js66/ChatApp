import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Header from '../../components/Header'
import styles from './style'
import { Icon } from 'react-native-elements'
import CommentForm from '../../components/CommentForm/CommentForm'
import { useNavigation } from '@react-navigation/native'
import { model, sendComment, repComment } from '../../service/firebase'
import auth from '@react-native-firebase/auth';

const ListComment = ({ data, inFor, onPress,idItem }) => {
    const { comment, createdAt, idUser, repcomment } = data
    
    return (
        <View>
            {inFor.map(user => {
                if (user.id == idUser) {
                    return <View style={{ flexDirection: 'row', marginBottom: 16 }} key={idItem}>
                        <Image source={{ uri: user.ava }} style={styles.imgava} />
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            {/**phần comment */}
                            <View style={styles.commentContain}>
                                <View>
                                    <Text style={{ paddingRight: 32 }}><Text style={styles.user}>{user.name}</Text> {comment}</Text>
                                </View>
                            </View>
                            {/**Phần thời gian và nhấn trả lời comment */}
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Text style={{ color: 'gray' }}>{createdAt}</Text>
                                <TouchableOpacity style={{ marginLeft: 16 }}
                                    onPress={onPress}
                                >
                                    <Text style={{ color: 'gray' }}>Trả lời</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            })}

            {
                repcomment.length !== 0 && repcomment.map(item => {
                    for (let users of inFor) {
                        if (users.id == item.uid) {
                            return <View style={{ flexDirection: 'row', marginLeft: 32, marginBottom: 16 }}>
                                <Image source={{ uri: users.ava }} style={styles.imgava2} />
                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    {/**phần comment */}
                                    <View style={styles.commentContain}>
                                        <Text><Text style={styles.user}>{users.name}</Text> {item.rep}</Text>
                                        {/**Phần nhấn like comment */}
                                    </View>

                                    {/**Phần thời gian và nhấn trả lời comment */}
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ color: 'gray' }}>{item.time}</Text>
                                        <TouchableOpacity style={{ marginLeft: 16 }}>
                                            <Text style={{ color: 'gray' }}>Trả lời</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    }
                }
                )
            }
        </View>
    )
}
const CommentScreen04 = ({ route }) => {
    const navigation = useNavigation()
    const { idPost } = route.params
    let uid = auth().currentUser.uid
    const [comment, setComment] = useState("")
    
    
    const [active, setActive] = useState(false)
  
    const [idComment, setIdComment] = useState("")
   

    const currentComment = model.currentComment.filter(item => item.idPost == idPost)
   
    return (
        <View style={{ flex: 1 }}>
            <Header title="Bình luận" user="SONTUNGMTP" onPress={() => navigation.navigate("Chat")} />
            <View style={{ flex: 1, marginLeft: 16, marginTop: 16 }}>
                <FlatList
                    data={currentComment}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListComment data={item} inFor={model.userInformation}
                        onPress={() => {
                            setActive(true)
                            setIdComment(item.id)
                        }}
                        idItem={item.id}
                    />}
                />
            </View>
           
            <View style={styles.commnentForm}>
                <CommentForm
                    source={require('../../image/mtp.jpg')}
                    placeHolder="Thêm bình luận ..."
                    onChangeText={(text) => {
                        setComment(text)
                    }}
            
                />
                {
                    comment !== "" && (
                        <TouchableOpacity style={styles.buttonSend}
                            onPress={() => {
                                active == false ? sendComment(idPost, comment, uid) : repComment(comment, uid, idComment)
                            }}
                        >
                            <Text style={{ fontSize: 17, color: '#00aaff' }}>Gửi</Text>
                        </TouchableOpacity>)
                }
            </View>
        </View>
    )
}
export default CommentScreen04