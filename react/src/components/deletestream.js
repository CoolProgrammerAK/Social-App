import React, { Component,Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deletestream} from '../redux/actions/dataaction'
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle'
const styles={
    deletebutton:{
        positiom:'absolute',
        left:"93%",
        top:"10%"
    }
}
class deletestreams extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open:false
        }
    }
    handleopen=()=>{
        this.setState({open:true})
    }
    handleclose=()=>{
     this.setState({open:false})
 }
    deletedstream=()=>{
        this.props.deletestream(this.props.streamid)
        this.setState({open:false})
    }
    
    render() {
        const {classes}=this.props
           

        return (
            <Fragment>
                <Tooltip title="Delete stream" placement="top">
                    <IconButton onClick={this.handleopen} className={classes.deletebutton} >
                    <DeleteOutline color="secondary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleclose} fullWidth maxWidth="sm"
                >
                    <DialogTitle>Are you want to delete this stream??</DialogTitle>
                    <DialogActions>
                    <Button onClick={this.deletedstream} color="secondary">
            Delete
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
deletestreams.propTypes={
    classes:PropTypes.object.isRequired,

    deletestream:PropTypes.func.isRequired,
}

const mapactiontoprops={
    deletestream
}

export default connect(null,mapactiontoprops)(withStyles(styles)(deletestreams))
