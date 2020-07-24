const functions = require('firebase-functions');
const {getallscream,createstream,getscream,commentonscreen,like,unlike,deletedstream}=require('./handlers/streams')
const {signup,login,uploadimage,adduser,getdetails,getuser,notify} =require('./handlers/users')
const Fbauth =require('./handlers/auth')
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
 const {db}=require('./admin/admin')
app.get('/streams',getallscream)
app.get('/streams/:streamid',getscream)
app.post('/create',Fbauth,createstream)
app.delete('/streams/:streamid',Fbauth,deletedstream)
app.post('/streams/:streamid/comments',Fbauth,commentonscreen)
app.get('/streams/:streamid/like',Fbauth,like)
app.get('/streams/:streamid/unlike',Fbauth,unlike)
app.post('/signup',signup)
app.post('/user/image',Fbauth,uploadimage)
app.post('/login',login)
app.post('/user',Fbauth,adduser)
app.get('/user',Fbauth,getdetails)
app.get('/user/:handle',getuser)
app.post('/notification',Fbauth,notify)
exports.api=functions.https.onRequest(app)

exports.createnotificationforlike=functions.firestore.document('likes/{id}').onCreate(data=>{db.doc(`streams/${data.data().streamid}`)
  .get().then(doc=>{
      if (doc.exists && doc.data().userhandle !==data.data().userhandle){
         return db.collection('notification').doc(data.id).set({
              createdat:new Date().toISOString(),
              recipient:doc.data().userhandle,
              sender:data.data().userhandle,
              type:'like',
              read:false,
              screamid:doc.id,
              id:data.id

          })
      }
  }).catch(err=>{
     console.log(err)
    
 })


})
exports.deletenotificationonunlike=functions.firestore.document('likes/{id}').onDelete(data=>{
     return db.collection('notification').doc(data.id).delete().catch(err=>{
        console.log(err)
    })
})

exports.createnotificationforcomment=functions.firestore.document('comments/{id}').onCreate(data=>{db.doc(`streams/${data.data().streamid}`)
.get().then(doc=>{
    
    if (doc.exists  && doc.data().userhandle !==data.data().userhandle){
      return  db.collection('notification').doc(data.id).set({
            createdat:new Date().toISOString(),
            recipient:doc.data().userhandle,
            sender:data.data().userhandle,
            type:'comment',
            read:false,
            screamid:doc.id,
            id:data.id

        })
    }
}).catch(err=>{
   console.log(err)
 
})


})
exports.changeimage=functions.firestore.document('users/{userid}').onUpdate((change)=>{
    console.log(change.after.data())
    console.log(change.before.data())
    if (change.before.data().url!==change.after.data().url){
    let batch=db.batch()
    return db.collection('streams')
    .where('userhandle', '==', change.before.data().handle).get().then(data=>{
       data.forEach(doc=>{
           const scream=db.collection('streams').doc(doc.id)
           batch.update(scream,{url:change.after.data().url})
       })
       return batch.commit()
    })
}else return true
})

exports.ondeletescream=functions.firestore.document('streams/{streamid}').onDelete((snapshot,context)=>{
  const streamid=context.params.streamid
  let batch=db.batch()
  return db.collection('comments').where('streamid','==',streamid).get().then(data=>{
      data.forEach(doc=>{
          batch.delete(db.collection('comments').doc(doc.id))

      })
      return db.collection('likes').where('streamid','==',streamid).get()}).then(data=>{
          data.forEach(doc=>{
              batch.delete(db.collection('likes').doc(doc.id))
          })
          return db
          .collection('notification')
          .where('streamid', '==', streamid)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`notification/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
      
  })
  
