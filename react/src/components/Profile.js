import React, { Component,Fragment } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'
import Muilink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import moment from 'moment'
import ProfileSkeleton from '../pages/profileskeleton'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import {uploadimage,logout} from '../redux/actions/useraction'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import EditDetails from './editdetails'
const styles = {
    paper:{
        padding:20
    },
    profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius:'50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      },
      
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  
};
  
class Profile extends Component {
    handlechange=e=>{
        const image=e.target.files[0]
        const formdata=new FormData()
        formdata.append("image",image,image.name)
        this.props.uploadimage(formdata)
    }
    editimage=()=>{
        const edit=document.getElementById('imagefile')
        edit.click()
    }
    handlelogout=()=>{
       this.props.logout()
    }
    render() {
        const {classes,user:{credentials:{handle,url,createdat,website,location,bio},authenticated,loading}}=this.props
        let profilesection=loading?(<ProfileSkeleton></ProfileSkeleton>):(authenticated?(
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={url} alt="" className="profile-image"></img>
                        <input type="file" id="imagefile" onChange={this.handlechange} hidden="hidden"/>
                        <Tooltip title="Edit Profile Picture" placement="top">
                        <IconButton onClick={this.editimage}  className="button">
                            <EditIcon color="primary" />
                        </IconButton></Tooltip>
                    </div>
                    <hr></hr>
                    <div className="profile-details">
                        <Muilink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </Muilink>
                        <hr></hr>
                        {bio && <Typography variant="body2">{bio}</Typography>}<hr></hr>
                        {location && <Fragment>
                        <LocationOnIcon color="primary"></LocationOnIcon><span>{location}</span><hr/>
                            </Fragment>}
                        {website && <Fragment>
                        <LinkIcon color="primary"/><a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a><hr/>
                            </Fragment>}
                        <CalendarTodayIcon color="primary"></CalendarTodayIcon>{" "}<span>Joined {moment(createdat).format('MMM YYYY')}</span>
                         <hr/>
                         <Tooltip title="Logout" placement="top">
                             <IconButton onClick={this.handlelogout} className={classes.button}>
                                 <KeyboardReturnIcon color="primary"></KeyboardReturnIcon>
                                  
                             </IconButton>
                         </Tooltip>
                         <EditDetails></EditDetails>

                    </div>
                </div>

            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found. Login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/Signup">Signup</Button>
                </div>
            </Paper>
        ))
        return profilesection
    }
}
Profile.propTypes={
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    uploadimage:PropTypes.func.isRequired,logout:PropTypes.func.isRequired
}

const mapstatetoprops=state=>({
    user:state.user
})
const mapactiontoprops={
    uploadimage,logout
}

export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(Profile))
