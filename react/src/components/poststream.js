import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {poststream} from '../redux/actions/dataaction'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton';
const styles=theme=>({
    ...theme.spreadThis,
    submitbutton:{
      position:'relative',
      float:'right',
      marginTop:10
    },
    progress:{
        position:'absolute'
    },
    closebutton:{
        position:'absolute',
        left:'91%',
        top:'1%'
    }
})

class Poststream extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open:false,errors:{},body:''
        }

    }
    componentWillReceiveProps(nextprops){
        if (nextprops.ui.errors){
            this.setState({
                errors:nextprops.ui.errors
            })
        }
        if (!nextprops.ui.errors && !nextprops.ui.loading){
            this.setState({
                body:"",open: false, errors: {} 
            })
            this.handleclose()
        }
    }
    handleopen=()=>{
        this.setState({
            open:true
        })
    }
    handleclose=()=>{
        this.setState({
            open:false,errors:{}
        })
    }
    post=(e)=>{
        e.preventDefault()
          if (this.state.body.length){
            this.props.poststream({body:this.state.body}) }
            else {
                this.setState({
                    errors:({body:"Body shouldn't be empty"})
                })
            }
            
        
        
    }
    handlechange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    render() {
        const {classes,ui:{loading}}=this.props
        const {errors}=this.state

        return (
            <Fragment> 
                <Tooltip title="Post stream" placement="top">
                    <IconButton onClick={this.handleopen} >
                    <AddIcon />

                    </IconButton>
                    
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleclose} fullWidth maxWidth="sm">
                    
                    <Tooltip title="Close" placement="top">
                    <IconButton onClick={this.handleclose} className={classes.closebutton} >
                    <CloseIcon color="primary"/>

                    </IconButton>
                    
                     </Tooltip>
                     <DialogTitle>
                        Post a stream
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.post}>
                            <TextField
                            name="body"
                            type="text"
                            label="Stream"
                            multiline
                            rows="3"
                            placeholder="Stream at your fellow apes"
                            fullWidth
                            error={errors.body?true:false}
                            helperText={errors.body}
                            className={classes.textField}
                            value={this.state.body}
                            onChange={this.handlechange}
                            >
                                
                            </TextField>
                            
                            <Button type="submit" color="primary" disabled={loading} variant="contained" className={classes.submitbutton}>
                                Submit {loading && <CircularProgress color="red" size={30} className={classes.progress}></CircularProgress>}
                            </Button>
                        </form>
                    </DialogContent>
                
          
         

                </Dialog>
            </Fragment>

        )
    }
}

Poststream.propTypes={
    classes:PropTypes.object.isRequired,
    poststream:PropTypes.func.isRequired,
    ui:PropTypes.object.isRequired
}
const mapstatetoprops=state=>({
    ui:state.UI
})
const mapactiontoprops={
    poststream
}


export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(Poststream))
