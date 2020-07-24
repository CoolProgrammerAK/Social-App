import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import Noimg from '../images/no-img.png'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper';
import PropTypes from  'prop-types'
const styles={
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
    fullLine:{
        height:15,
        width:'100%',
        marginBottom:10,backgroundColor:'rgba(0,0,0,0.4)'
    },
    handle:{
        width:60,
        height:20,
        backgroundColor:'#00bcd4',
        margin:'0 auto 7px auto'
    }
}

const profileskeleton = (props) => {
    const {classes}=props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                <img src={Noimg} alt="profile" className="profile-image"></img>
            </div><hr/>
            <div className="profile-details">
            <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr/>
                    <LocationOnIcon color="primary"/><span>Location</span><hr/>
                    <LinkIcon color="primary"></LinkIcon>https://website.com
                    <hr/>
                    <CalendarTodayIcon color="primary"></CalendarTodayIcon> Joined date
            </div>
            </div>
        </Paper>
    )
}

profileskeleton.propTypes={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(profileskeleton)
