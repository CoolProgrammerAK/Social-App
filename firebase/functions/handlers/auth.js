const {admin}=require('../admin/admin')
module.exports=(req,res,next)=>{
    let idtoke
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idtoke=req.headers.authorization.split('Bearer ')[1]
    }
    else
    {
        res.status(400).json({error:"Unauthorized user"})
    }
    admin.auth().verifyIdToken(idtoke).then(decoded=>{
         req.user=decoded

        
        return admin.firestore().collection('users').where("userid","==",req.user.uid).limit(1).get()})
    .then(data=>{
        
        req.user.handle=data.docs[0].data().handle
        req.user.url=data.docs[0].data().url
        return next();
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({err})
    })

}
