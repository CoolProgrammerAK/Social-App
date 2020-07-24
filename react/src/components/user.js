import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Stream from './streams'
import {connect} from 'react-redux'
import {userdetails} from '../redux/actions/dataaction'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Staticprofile from './staticprofile'
import Streamskeleton from '../pages/streamskeleton'
import ProfileSkeleton from '../pages/profileskeleton'
const styles={}
 class user extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              profile:null,id:null
         }
     }
     componentDidMount(){
         const handle=this.props.match.params.handle
         const streamid=this.props.match.params.streamid
         if (streamid){
             this.setState({
                 id:streamid
             })
         }
         this.props.userdetails(handle)
         axios.get(`/user/${handle}`).then(res=>{
             
             this.setState({
                 profile:res.data.user
             })

         }).catch(err=>{
             console.log(err)
         })
     }
     
    render() {
      
        const {data:{streams,loading}}=this.props
      
        const {id}=this.state
        const markupp=loading?(<Streamskeleton/>):streams===null?(<p>No stream found</p>):!id?(
            streams.map(stream=>(<Stream key={stream.setid} stream={stream} ></Stream>))
        )
        :( 
            streams.map(stream=>{
                if (stream.setid!==id){
                   return <Stream key={stream.setid} stream={stream} ></Stream>
                }
                else{
                  return  <Stream key={stream.setid} stream={stream} opendialog></Stream>
                }
            })
        )
        return (
            <Grid container spacing={3}>
              <Grid item sm={8} xs={12}>
                   {markupp}
              </Grid>
              <Grid item sm={4} xs={12}>
                  {this.state.profile===null?
                  (<ProfileSkeleton></ProfileSkeleton>):
                  <Staticprofile profile={this.state.profile}/>
                  }
                
              </Grid>

            </Grid>
        )
    }
}
user.propTypes={
    classes:PropTypes.object.isRequired,
    userdetails:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
    
}
const mapstatetoprops=state=>({
    data:state.data
    
    })
const mapactiontoprops={
userdetails
}

export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(user))
