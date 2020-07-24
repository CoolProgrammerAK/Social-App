import React, { Component } from 'react'

import {Link} from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

import {likestream,unlikestream} from '../redux/actions/dataaction'

export class LikeButton extends Component {
    likedstream=()=>{
        if (this.props.user.likes && this.props.user.likes.find(like=>like.streamid===this.props.setid)){
            return true
        }
        else {
            return false
        }
    }
    likestream=()=>{
        this.props.likestream(this.props.setid)
       
    }
    unlikestream=()=>{
        this.props.unlikestream(this.props.setid)
    }
    render() {
        
        const {user:{authenticated}}=this.props
        const likebutton=!authenticated?(
            <Tooltip title="Like" placement="top">
            <IconButton component={Link} to="/login">
               <FavoriteBorderIcon color="primary"/>
           </IconButton>
             </Tooltip>
        ):this.likedstream()?(
            <Tooltip title=" Undo Like" placement="top">
            <IconButton onClick={this.unlikestream}>
               <FavoriteIcon color="primary"/>
           </IconButton>
             </Tooltip>
        ):(
            <Tooltip title="Like" placement="top">
            <IconButton onClick={this.likestream}>
               <FavoriteBorderIcon color="primary"/>
           </IconButton>
             </Tooltip>
        )
        return (
            likebutton
        )
    }
}
LikeButton.propTypes={
  

    likestream:PropTypes.func.isRequired,unlikestream:PropTypes.func.isRequired,user:PropTypes.object.isRequired

}

const mapstatetoprops=state=>({
    user:state.user
})
const mapactiontoprops={
    likestream,unlikestream
  
}


export default connect(mapstatetoprops,mapactiontoprops)(LikeButton)

