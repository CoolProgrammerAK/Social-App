import React, { Component ,Fragment} from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from  'prop-types'
import moment from 'moment'
import ChatIcon from '@material-ui/icons/Chat'
import FavouriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge'
import {marknotify} from '../redux/actions/useraction'

class notify extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             anchorEi:null
        }
    }
   handleopen = (event) => {
        this.setState({anchorEi:event.target})
      }
    
      handleclose = () => {
        
        this.setState({anchorEi:null})
      }
    onMenuOpened=()=>{
        const ids=this.props.notification.filter(not=>not.read===false).map(not=>not.notificationid)
    
        
        this.props.marknotify(ids)
    }
    render() {
        
        const {anchorEi}=this.state
        const {notification}=this.props
      
        let numbericon
        if ( notification && notification.length>0){
          notification.filter(notif=>notif.read===false).length>0?(
              numbericon=(
                   <Badge badgeContent={ notification.filter(notif=>notif.read===false).length} color="secondary">
                       <NotificationsIcon></NotificationsIcon>
                   </Badge>
              )
          ):numbericon=<NotificationsIcon></NotificationsIcon>
        }
        else{
            numbericon=<NotificationsIcon></NotificationsIcon> 
        }
        let notiffy=notification && notification.length>0?(
            notification.map(not=>{
                const verb=not.type==='like'?'like':'comment'
                const time=moment(not.createdat).fromNow()
                const iconcolor=not.read?'primary':'secondary'
                const icon=not.type==='like'?(<FavouriteIcon color={iconcolor} style={{marginRight:10}}></FavouriteIcon>):
                (<ChatIcon color={iconcolor} style={{marginRight:10}}></ChatIcon>)
               return (<MenuItem key={not.createdat} onClick={this.handleclose}>
                   {icon}
                   <Typography component={Link} color="initial" variant="body1" to={`/users/${not.recipient}/streams/${not.screamId}`}>
                       {not.sender} {verb} your stream {time}
                   </Typography>
                   </MenuItem>)
            })
            
        ):(<MenuItem onClick={this.handleclose}>You have no notifications to read</MenuItem>)
        return (
            <Fragment>
                <Tooltip title="Notification" placement="top">
                             <IconButton  aria-owns={anchorEi?'Simple-menu':undefined} onClick={this.handleopen} aria-haspopup="true">
                               {numbericon}
                            </IconButton>
                  </Tooltip>
                  <Menu anchorEl={anchorEi} open={Boolean(anchorEi)}
                  onClose={this.handleclose}
                  onEntered={this.onMenuOpened}>
                      {notiffy}

                  </Menu>
            </Fragment>
        )
    }
}
notify.propTypes={
    notification:PropTypes.array.isRequired,
    marknotify:PropTypes.func.isRequired
  }
const mapstatetoprops=state=>({
    notification:state.user.notification  })
const mapactiontoprops={
    marknotify
} 

export default connect(mapstatetoprops,mapactiontoprops)(notify)