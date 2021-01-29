import firestore from '@react-native-firebase/firestore'

export const model = {
    currentComment: [],
    postOnNewfeed: null,
    userInformation: []
}
export const getUserInformation = async () => {
    let user = await firestore().collection('UserInformation').get()
    let Information = []
    for (let data of user.docs) {
        Information.push(data.data())
    }
    model.userInformation = Information
}
getUserInformation()

const loadPost = async () => {
    let listPost = await firestore().collection('Post').get()
    let post = []
    for (let doc of listPost.docs) {
        post.push(doc.data())
    }
    model.postOnNewfeed = post
}
loadPost()

const loadComment = async () => {
    let result = await firestore().collection('Comment').get()
    .then(querySnapshot => {
        let comment = []
        querySnapshot.forEach(doc => {
            comment.push({id:doc.id, ...doc.data()})
        })
        model.currentComment = comment
    })
}
loadComment()

export const sendComment = async (idPost, comment, uid) => {
    listenRealtimeUpdate()
    try {
        let d = new Date()
        let ngay = d.getDate()
        let thang = d.getMonth() + 1
        let nam = d.getFullYear();
        let newComment = {
            comment: comment,
            idUser: uid,
            createdAt: `${ngay}/${thang}/${nam}`,
            idPost: idPost,
            repcomment: []
        }
        await firestore().collection("Comment").add(newComment)
    } catch (error) {
        console.log(error)
    }
}

export const repComment = async (comment, uid, id) => {
    listenRealtimeUpdate()
    try{
        let d = new Date()
        let ngay = d.getDate()
        let thang = d.getMonth() + 1
        let nam = d.getFullYear();
        let newRepComment = {
            rep:comment,
            uid:uid,
            time:`${ngay}/${thang}/${nam}` 
        }
        await firestore().collection("Comment").doc(id).update({
            repcomment: firestore.FieldValue.arrayUnion(newRepComment)
        })
    }catch(error){
        console.log(error)
    }
}

const updateComment = (newComment) => {
   let findIndex = model.currentComment.findIndex(item => item.id == newComment.id)

   if(findIndex < 0){
       model.currentComment.push(newComment)
   }
   else{
       model.currentComment[findIndex] = newComment
   }
}


const listenRealtimeUpdate = () => {
    firestore().collection("Comment").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(change => {
            if(change.type == "added"){
                updateComment({id:change.doc.id,...change.doc})
                loadComment()
            }
            else if (change.type == 'modified'){
                updateComment({id:change.doc.id,...change.doc})
                loadComment()
            }
        })
    })
}

