import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar' 
import Button from '@material-ui/core/Button' 
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from  'prop-types'
import HomeIcon from '@material-ui/icons/Home'
import Notification from './notify'

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Poststream from './poststream'
class Navbar extends Component {
    render() {
      const {authenticated}=this.props
        return (
            <AppBar position="fixed">
              <Toolbar className="nav-container">
                {authenticated ?
                (  <>
                 <Poststream/>
                  <Tooltip title="Home" placement="top">
                             <IconButton  component={Link} to="/">
                                <HomeIcon color="primary"/>
                            </IconButton>
                  </Tooltip>
                  
                   <Notification/>
                  </>
                ):
                (  <>
                 <Button color="inherit" component={Link} to="/">Home</Button>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  </>
                )
                }
                
               
              </Toolbar>
            </AppBar>
        )
    }
}
Navbar.propTypes={
  authenticated:PropTypes.object.isRequired
}
const mapstatetoprops=state=>({
  authenticated:state.user.authenticated
})

export default connect(mapstatetoprops)(Navbar)