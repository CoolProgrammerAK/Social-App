import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editdetails} from '../redux/actions/useraction'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
const styles=theme=>({
...theme.spreadThis,

})
class editdetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bio:"",location:"",website:"",open:false
        }
    }
    componentDidMount(){
        const {credentials}=this.props 
        this.setdatas(credentials)
        
    }
    handleclose=()=>{
        this.setState({open:false})
    }
    handledit=()=>{
        this.setState({open:true})
        
    }
    setdatas=(credentials)=>{
        this.setState({
            bio:credentials.bio?credentials.bio:"",
            location:credentials.location?credentials.location:"",
            website:credentials.website?credentials.website:""
        })
    }
    handlesubmit=()=>{
        const userdetails={
            bio:this.state.bio,
            website:this.state.website,
            location:this.state.location
        }
        this.props.editdetails(userdetails)
        this.handleclose()
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        
        const {classes}=this.props
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handledit} >
                    <EditIcon color="primary">

                    </EditIcon>
                    </IconButton>
                    
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleclose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Edit your Details
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            name="bio"
                            type="text"
                            label="Enter your Brief bio"
                            multiline
                            rows="3"
                            fullWidth
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.onchange}
                            >
                                
                            </TextField>
                            <TextField
                            name="website"
                            type="text"
                            label="Enter your website if any"
                            
                            fullWidth
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.onchange}
                            >
                                
                            </TextField>
                            <TextField
                            name="location"
                            type="text"
                            label="Enter your location"
                            fullWidth
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.onchange}
                            >
                                
                            </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
          
          <Button onClick={this.handlesubmit} color="primary">
            Save and Submit
          </Button>
          <Button onClick={this.handleclose} color="primary">
            Close
          </Button>
          </DialogActions>

                </Dialog>
            </Fragment>
        )
    }
}
editdetails.propTypes={
editdetails:PropTypes.func.isRequired,
classes:PropTypes.object.isRequired
}
const mapstatetoprops=state=>({
    credentials:state.user.credentials
})
const mapactiontoprops={
    editdetails
}

export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(editdetail))
