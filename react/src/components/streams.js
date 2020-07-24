import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Streamdialoag from './streamdialoag'
import moment from 'moment'
import {connect} from 'react-redux'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import LikeButton from './likebutton'

import Deletestream from './deletestream'
const styles={
    card:{
        display:'flex',
        marginBottom:20
    },
    image:{
        minWidth:200
    },
    content:{
        padding:20,
        objectFit:"cover"
    }
}
class Streams extends Component {
   


    render() {
      
        const {classes,stream:{body,createdat,likecount,commentcount,userhandle,url,setid},user:{authenticated ,credentials:{handle}}}=this.props
        
        const deletebutton=authenticated && userhandle===handle?(
            <Deletestream streamid={setid}></Deletestream>):null
        
        return (
            
                <Card className={classes.card}>
                    <CardMedia
                        image={url}
                        title="Profile Image" className={classes.image}></CardMedia>
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component={Link} to={`/users/${userhandle}`} color="primary">
                                {userhandle}
                            </Typography>
                            {deletebutton}
                            <Typography body="body2" color="textSecondary">
                                { moment(createdat).fromNow()}
                            </Typography>
                            <Typography body="body1">
                                {body}
                            </Typography>
                            <LikeButton setid={setid}></LikeButton>
                            <span>{likecount} likes</span>
                            <Tooltip title="Comment" placement="top">
                             <IconButton >
                                <ChatIcon color="primary"></ChatIcon>
                            </IconButton>
                              </Tooltip>
                              <span>{commentcount} comments</span>
                              <Streamdialoag userhandle={userhandle} id={setid} opendialog={this.props.opendialog}></Streamdialoag>

                        </CardContent>
                    

                </Card>
        )
    } 
}
Streams.propTypes={
    classes:PropTypes.object.isRequired,
  
}

const mapstatetoprops=state=>({
    user:state.user
})


export default connect(mapstatetoprops)(withStyles(styles)(Streams))
