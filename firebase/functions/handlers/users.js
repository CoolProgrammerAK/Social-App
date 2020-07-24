const config=require('../admin/config')
const firebase=require('firebase')
firebase.initializeApp(config)
const {validatesign,validatelogin,validatedetails}=require('../admin/extras')
const {admin,db}=require('../admin/admin')

const { encode } = require('punycode')
exports.signup=(req,res)=>{
    const newuser={
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        handle:req.body.handle
    }
    const {errors,valid}=validatesign(newuser)
    if (!valid){
        return res.status(400).json(errors)
    }
    const noimage='blank-profile-picture-973460_640.png'
    let userid,token
   admin.firestore().collection('users').doc(`${newuser.handle}`).get().then(doc=>{
        if(doc.exists){
           return res.status(500).json({handle:"Handle already taken"})
        }
        else{
            return firebase.auth().createUserWithEmailAndPassword(newuser.email,newuser.password)
        }
        
    }).then(data=>{
        userid=data.user.uid
        return data.user.getIdToken()
    }).then(idtoken=>{
        
        token=idtoken
        return admin.firestore().doc(`/users/${newuser.handle}`).set({
           email:newuser.email,
           userid,
           password:newuser.password,
           handle:newuser.handle,
           url:`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noimage}?alt=media`,
           createdat:new Date().toISOString()
        })}).then(()=>{
        return res.status(200).json({token})})
        .catch(err=>{console.error(err)
            if (err.code==="auth/email-already-in-use"){return res.status(400).json({email:"Already in use"})}
            else{
          return res.status(400).json({general:"Something went wrong.Try Again"})}
        })
}


exports.login=(req,res)=>{
    const log={
        email:req.body.email,
        password:req.body.password
    }
    const {errors,valid}=validatelogin(log)
    if (!valid){
        return res.status(400).json(errors)
    }
   
    
    firebase.auth().signInWithEmailAndPassword(log.email,log.password).then(data=>{
        return data.user.getIdToken()
    }).then(id=>res.status(200).json({id})).catch(err=>{
        console.error(err)
        
        res.status(400).json({general:"Something went wrong.Try Again"})
    })
}

exports.adduser=(req,res)=>{
    const userdetails=validatedetails(req.body)
    admin.firestore().doc(`users/${req.user.handle}`).update(userdetails).then(()=>{
       return res.json({message:"profile created successfully"})
    }).catch(err=>{
       return res.status(400).json({error:err.code})
    })

}
exports.getdetails=(req,res)=>{
    let resdata={}
    admin.firestore().doc(`users/${req.user.handle}`).get().then(doc=>{
        if(doc.exists){
            resdata.credentials=doc.data()
            return admin.firestore().collection('likes').where('userhandle','==',req.user.handle).get()
        }
    }).then(data=>{
        resdata.likes=[]
        data.forEach(doc=>{
            resdata.likes.push(doc.data())
        })
        return admin.firestore().collection('notification').where('recipient','==',req.user.handle).orderBy('createdat','desc').limit(10).get()}).then(data=>{
           resdata.notification=[]
            data.forEach(doc=>{
               resdata.notification.push({recipient: doc.data().recipient,
                sender: doc.data().sender,
                createdat: doc.data().createdat,
                screamId: doc.data().screamid,
                type: doc.data().type,
                
                read: doc.data().read,notificationid:doc.id})
           })
        return res.json(resdata)
    }).catch(err=>{
        console.log(err)
        return res.json(err)
    })
}
exports.getuser=(req,res)=>{
    let userdata={}
    admin.firestore().doc(`users/${req.params.handle}`).get().then(data=>{
        if(data.exists){
        userdata.user=data.data()
         return admin.firestore().collection('streams').where('userhandle','==',req.params.handle).orderBy('createdat','desc')
         .get()}
         else{
             return res.json({err:"handle not exist"})
         }
        }).then((doc)=>{
             userdata.stream=[]
             doc.forEach(data=>{
                 userdata.stream.push({
                     body:data.data().body,
                     url:data.data().url,
                     commentcount:data.data().commentcount,
                     likecount:data.data().likecount,
                     userhandle:data.data().userhandle,
                     createdat:data.data().createdat,
                     setid:data.id
                 })
             })
             return res.json(userdata)

         }).catch(err=>{
             console.error(err)
             res.json(err)
         })
}

exports.uploadimage=(req,res)=>{
    const Busboy=require('busboy')
    const path=require('path')
    const fs=require('fs')
    const os=require('os')

    let imagename
    let image={}
    const busboy=new Busboy({headers:req.headers})
    busboy.on('file',(fieldname,file,filename,encoding,mimetype)=>{
      if (mimetype!=='image/jpeg' && mimetype!=='image/png'){
          return res.status(400).json({error:"Not valid image"})
      }
      const imagextension=filename.split('.')[filename.split('.').length-1]
      imagename=`${Math.round(Math.random()*1000000000000)}.${imagextension}`
      var saveto=path.join(os.tmpdir(),imagename)
      image={saveto,mimetype}
      file.pipe(fs.createWriteStream(saveto))
    })
    busboy.on('finish',()=>{
        admin.storage().bucket().upload(image.saveto,{
            resumable:false,
            metadata:{
                metadata:{
                    contentType:image.mimetype
                }
            }
        }).then(()=>{
            var url=`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagename}?alt=media`
            return admin.firestore().collection('users').doc(req.user.handle).update({
               url
            })
        }).then(()=>{
            res.json({message:'Image Uploaded successfully'})
        }).catch(err=>{
            res.status(400).json({err})
        })
    })
    busboy.end(req.rawBody)
}
exports.notify = (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId) => {
      const notification = db.doc(`notification/${notificationId}`);
      batch.update(notification, { read: true });
    });
    batch
      .commit()
      .then(() => {
        return res.json({ message: "Notifications marked read" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err });
      });
  };