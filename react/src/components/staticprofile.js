import React, { Fragment,Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Muilink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import {Link} from 'react-router-dom'
import moment from 'moment'

const styles = {
    paper:{
        padding:20
    },
    profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      
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
    }
  
}}

class staticprofile extends Component {
    render() {
        const {classes,profile:{handle,url,createdat,website,location,bio}}=this.props
        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={url} alt="" className="profile-image"></img>
                       
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
                        

                    </div>
                </div>

            </Paper>
        )
    }
}

staticprofile.propTypes={
    classes:PropTypes.object.isRequired
}


export default withStyles(styles)(staticprofile)
