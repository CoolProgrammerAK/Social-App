import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DialogContent from '@material-ui/core/DialogContent';
import Comment from './comment'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import UnFoldMoreIcon from '@material-ui/icons/UnfoldMore'
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment'
import {Link} from 'react-router-dom'
import Commentform from './commentform'
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid'
import {getstream} from '../redux/actions/dataaction'
import Typography from '@material-ui/core/Typography'
import LikeButton from './likebutton'
import ChatIcon from '@material-ui/icons/Chat'
import CircularProgress from '@material-ui/core/CircularProgress'
const styles=theme=>({
    invisible:{
        border:'none',
        margin:4
    },
    closebutton:{
        position:'absolute',
        left:'91%',
        top:'1%'
    },
    roller:{
        marginTop:'50',
        marginBottom:'50',
        textAlign:'center'

    },
    unfoldbutton:{
        position:'absolute'
        
    },

    profileimage:{
        maxWidth:200,
        height:200,
        objectFit:'cover',
        borderRadius:"50%"

    },
    dialogContent:{
         padding:20
    },
    visibleseparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0,1)',
        marginBottom:20
    }
})
 class Streamdialoag extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open:false,oldpath:'',newpath:''
        }

    }
    componentDidMount(){
        if (this.props.opendialog){
            this.handleopen()
        }
    }
    handleopen=()=>{
        let oldpath=window.location.pathname
        const {userhandle,id}=this.props
        const newpath=`/users/${userhandle}/streams/${id}`
        window.history.pushState(null,null,newpath)
        if (oldpath===newpath){
            oldpath=`/users/${userhandle}`
        }
        this.setState({
            open:true,
            oldpath,newpath
        })
        this.props.getstream(this.props.id)
    }
    handleclose=()=>{
      
        window.history.pushState(null,null,this.state.oldpath)
        this.setState({
            open:false
        })
    }
    render() {
        const {classes,stream:{body,createdat,likecount,commentcount,userhandle,url,streamid,comments},ui:{loading}}=this.props
       const dialogmarkup=loading?(
           <div className={classes.roller}>
                    <CircularProgress color="primary" size={100} thickness={2}  ></CircularProgress>
           </div>
            
        ):(
            <>
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={url} alt="Profile image" className={classes.profileimage}/>
                </Grid>
                <Grid item sm={7}>
        <Typography component={Link} variant="h5" color="primary" to={`/users/${userhandle}`}>@{userhandle}
        </Typography>
            <hr className={classes.invisible}></hr>
        <Typography variant="body2" color="textSecondary">{moment(createdat).format('h:mm a, MMMM DD YYYY')}</Typography>
        <hr className={classes.invisible}></hr>
        <Typography variant="body1">{body}</Typography>
        <LikeButton setid={streamid}></LikeButton>
                            <span>{likecount} likes</span>
                            <Tooltip title="Comment" placement="top">
                             <IconButton >
                                <ChatIcon color="primary"></ChatIcon>
                            </IconButton>
                              </Tooltip>
                              <span>{commentcount} comments</span>
                             

             </Grid>
            </Grid>
           
             <hr className={classes.visibleseparator}/>
             <Commentform streamid={streamid}></Commentform>
             <Comment comments={comments} url={url}></Comment>
              </>
        )
        return (
           <Fragment>
               <Tooltip title="Expanded stream" placement="top">
                    <IconButton onClick={this.handleopen} className={classes.unfoldbutton}>
                    <UnFoldMoreIcon color="primary" />

                    </IconButton>
                    
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleclose} fullWidth maxWidth="sm">
                    
                    <Tooltip title="Close" placement="top">
                    <IconButton onClick={this.handleclose} className={classes.closebutton} >
                    <CloseIcon color="primary"/>

                    </IconButton>
                    
                     </Tooltip>
                   
                    <DialogContent className={classes.dialogContent}></DialogContent>
                    {dialogmarkup}
                    </Dialog>
           </Fragment>
        )
    }
}
Streamdialoag.propTypes={
    classes:PropTypes.object.isRequired,
    getstream:PropTypes.func.isRequired,
    ui:PropTypes.object.isRequired,
    stream:PropTypes.object.isRequired
}
const mapstatetoprops=state=>({
    ui:state.UI,
    stream:state.data.stream
})
const mapactiontoprops={
    getstream
}


export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(Streamdialoag))
