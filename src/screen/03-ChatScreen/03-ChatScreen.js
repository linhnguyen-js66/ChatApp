import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import LikeCommentDirect from '../../components/LikeCmtDr'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { model } from '../../service/firebase'
import { FlatList } from 'react-native-gesture-handler'
const ChatScreen03 = () => {
    const navigation = useNavigation()
    console.log("print", model.userInformation)
    return (
        <ScrollView>
            <Header title="Bài viết" user="SONTUNGMTP" />
            <FlatList
                data={model.postOnNewfeed}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) =>
                    <View key={item.id} style={{ marginBottom: 16 }}>
                        {model.userInformation.map(user => {
                            if (user.id == item.idUser) {
                                return <View style={styles.contain}>
                                    <Image source={{ uri: user.ava }} style={styles.imgava} />
                                    <View style={styles.name}>
                                        <Text style={styles.nameNV}>{user.name}</Text>
                                        <Icon reverse type="antDesign"
                                            name="check" size={5}
                                            reverseColor="white"
                                            color="#0080ff"
                                        />
                                    </View>
                                </View>
                            }
                        })}
                        <View>
                            <Image source={{uri:item.imagePost}} style={styles.imgBody} />
                        </View>
                        <View style={styles.containIcon}>
                            <LikeCommentDirect name="hearto" type="antdesign" />
                            <LikeCommentDirect name="chatbubble-outline" type="ionicon"
                                style={{ transform: [{ rotateY: '180deg' }] }}
                                onPress={() => navigation.navigate("Comment",{
                                    idPost:item.id
                                })}
                            />
                            <LikeCommentDirect name="md-paper-plane-outline" type="ionicon" />
                            <View style={styles.bookmark}>
                                <LikeCommentDirect name="bookmark-o" type="font-awesome" />
                            </View>
                        </View>
                        <View style={styles.infoLike}>
                            <Image source={require('../../image/tbt.png')} style={styles.imgLike} />
                            <Text style={{ marginLeft: 8 }}>Có
           <Text style={{ fontWeight: 'bold' }}> thieubaotram</Text> và
           <Text style={{ fontWeight: 'bold' }}> {item.amountLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} người khác </Text>
           thích
           </Text>
                        </View>
                        <View style={styles.containStatus}>
                            {model.userInformation.map(user => {
                                if (user.id == item.idUser) {
                                    return <Text style={styles.nameUser}>{user.name}</Text>
                                }
                            })}
                            <Text style={styles.status}>{item.content}</Text>
                        </View>
                        <View style={{ marginLeft: 16, marginTop: 4 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Comment",{
                                idPost:item.id
                            })}>
                                <Text style={{ color: 'gray' }}>
                                    Xem tất cả {item.amountComment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} bình luận
                                    </Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'gray', marginTop: 4 }}>{item.time}</Text>
                        </View>
                    </View>
                }
            />
        </ScrollView>
    )
}
export default ChatScreen03