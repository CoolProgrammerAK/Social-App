import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {commentstream} from '../redux/actions/dataaction'
const styles=theme=>({
    visibleseparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0,1)',
        marginBottom:20
    },
    textField:{
        padding:20
    },
    add:{
        margin: '0 23px 0 23px'
    },
    ...theme.spreadThis

})
class commentform extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             body:'',errors:{}
        }
    }
    componentWillReceiveProps(nextprops){
        if (nextprops.ui.errors){
            this.setState({errors:nextprops.ui.errors})
        }
        if (!nextprops.ui.errors && !nextprops.ui.loading){
            this.setState({body:""})
        }
    }
    change=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handlesubmit=(e)=>{
        e.preventDefault()
        this.props.commentstream(this.props.streamid,{body:this.state.body})
    }
    
    render() {
        const {classes,authenticated}=this.props
        const {errors}=this.state
        const commentformmarkup=authenticated?(
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handlesubmit} className={classes.add}>
                    <TextField
                    type="text"
               
                    name="body"
                    label="Comment on Stream"
                    error={errors.comment?true:false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.change}
                    fullWidth
                    className={classes.textField}>
                        
                        
                    </TextField>
                    <Button variant="contained" type="submit" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleseperator}></hr>

            </Grid>
        ):null
        return commentformmarkup
    }
}
commentform.propTypes={
    classes:PropTypes.object.isRequired,
    commentstream:PropTypes.func.isRequired,
    ui:PropTypes.object.isRequired,
    authenticated:PropTypes.object.isRequired
}
const mapstatetoprops=state=>({
    ui:state.UI,
    authenticated:state.user.authenticated,
    
    })
const mapactiontoprops={
  commentstream
}

export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(commentform))
