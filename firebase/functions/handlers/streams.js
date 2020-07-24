const {db}=require('../admin/admin')

exports.getallscream=(req,res)=>{
    db.collection('streams').orderBy("createdat","desc").get().then(doc=>{
        let set=[]
        doc.forEach(dot=>{

             set.push({...dot.data(),setid:dot.id})
        })
        return res.json(set)
    }).catch(err=>{
        console.error(err)
    })
}
exports.createstream=(req,res)=>{
    if (req.body.body.trim()===""){
        res.status(400).json({body:"Body must not be empty"})
    }
    const data={
        userhandle:req.user.handle,
        body:req.body.body,
        createdat:new Date().toISOString(),
        url:req.user.url,
        likecount:0,
        commentcount:0
    }
    db.collection('streams').add(data).then(doc=>{
        const newstream=data
        newstream.streamid=doc.id
        res.json(newstream)
    }).catch(err=>{
        console.error(err)
    })
}

exports.getscream = (req, res) => {
    let screamData = {};
    db.doc(`streams/${req.params.streamid}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Stream not found' });
        }
        screamData = doc.data();
        screamData.streamid = doc.id;
        return db
          .collection('comments')
          .orderBy('createdAt','desc')
          .where('streamid', '==',req.params.streamid)
          .get();
      })
      .then((data) => {
        screamData.comments = [];
        data.forEach((doc) => {
          screamData.comments.push(doc.data());
        });
        return res.json(screamData); 
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  }
exports.commentonscreen = (req, res) => {
    if (req.body.body.trim() === '')
      return res.status(400).json({ comment: 'Must not be empty' });
  
    const newComment = {
      body: req.body.body,
      createdAt: new Date().toISOString(),
      streamid: req.params.streamid,
      userhandle: req.user.handle,
      url: req.user.url
    };
    
  
    db.doc(`streams/${req.params.streamid}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Stream not found' });
      }
      return doc.ref.update({ commentcount: doc.data().commentcount + 1 });
    })
    .then(() => {
      return db.collection('comments').add(newComment);
    }).then(()=>{
        res.json(newComment);

     }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  };
exports.like=(req,res)=>{

    const likedoc=db.collection('likes').where('userhandle',"==",req.user.handle).where('streamid','==',req.params.streamid).limit(1)
    const streamdoc=db.doc(`streams/${req.params.streamid}`)

    let streamdata={}
    streamdoc.get().then(doc=>{
        if (doc.exists){
            streamdata=doc.data()
            streamdata.streamid=doc.id
            return likedoc.get()
        }
        else{
            return res.status(404).json({error:"Stream not found"})
        }

    }).then(doc=>{
        if (doc.empty){
            return db.collection('likes').add({ 
                userhandle:req.user.handle,
                streamid:req.params.streamid

            }).then(()=>{
                streamdata.likecount++
                streamdoc.update({likecount:streamdata.likecount})
            }).then(()=>{
                 res.json(streamdata)
            })
        }
        else{
            return res.json({msg:"stream already liked"})
        }

    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
}
exports.unlike=(req,res)=>{

    const likedoc=db.collection('likes').where('userhandle',"==",req.user.handle).where('streamid','==',req.params.streamid).limit(1)
    const streamdoc=db.doc(`streams/${req.params.streamid}`)

    let streamdata={}
    streamdoc.get().then(doc=>{
        if (doc.exists){
            streamdata=doc.data()
            streamdata.streamid=doc.id
            return likedoc.get()
        }
        else{
            return res.status(404).json({error:"Stream not found"})
        }

    }).then(doc=>{
        if (doc.empty){
            return res.json({msg:"stream not liked"})
            
        }
        else{
            return db.doc(`likes/${doc.docs[0].id}`).delete().then(()=>{
                streamdata.likecount--
                streamdoc.update({likecount:streamdata.likecount})
            }).then(()=>{
                 res.json(streamdata)
            })
        }

    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
}

exports.deletedstream = (req, res) => {
  const document = db.doc(`streams/${req.params.streamid}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      if (doc.data().userhandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Scream deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};