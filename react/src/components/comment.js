import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import moment from 'moment'
const styles={
    invisible:{
    border:'none',
    margin:4
},
visibleseparator:{
    width:'100%',
    borderBottom:'1px solid rgba(0,0,0,0,1)',
    marginBottom:20
},
photo:{
    maxWidth:'100%',
    borderRadius:'50%',
    objectFit:'cover',
    height:100
},
commentdata:{
    marginLeft:20
}}

class comment extends Component {
    render() {
        const {comments,classes,url}=this.props
        return (
            <Grid container>
                {comments.map((commented,index)=>{
                    const {body,createdAt,userhandle}=commented
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={url} alt="Profile Photo" className={classes.photo}/>
                                    </Grid>
                                    <Grid item sm={5}>
                                        <div className={classes.commentdata}>
                    <Typography component={Link} variant="h5" to={`/users/${userhandle}`}>{userhandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{moment(createdAt).format('h:mm a,MMMM DD YYYY')}</Typography>
                    <hr className={classes.invisible}></hr>
                    <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index!==comments.length-1 && <hr className={classes.visibleseparator}/>}
                            
                        </Fragment>

                    )
                })}
            </Grid>
        )
    }
}
comment.propTypes={
    comments:PropTypes.array.isRequired,
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(comment)
