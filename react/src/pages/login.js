import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid  from '@material-ui/core/Grid'
import icon from '../images/icon.png'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {loginuser} from '../redux/actions/useraction'
const styles = (theme) => ({
  ...theme.spreadThis
});

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",password:"",errors:{}
        }
    }
    handlesubmit =event=>{
        event.preventDefault()
     
      const userdata={
          email:this.state.email,
          password:this.state.password
          
      }
      this.props.loginuser(userdata,this.props.history)
      
}
componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
        this.setState({errors:nextProps.ui.errors})
    }
}
handleChange=e=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

    render() { 
       
        const {classes,ui:{loading}}=this.props
        const {errors}=this.state
       
        return (
            <Grid container className={classes.form}>
            <Grid item sm></Grid>
            <Grid item sm><img src={icon} alt="Monkey" className={classes.image}/>
            <Typography variant="h3" className={classes.pagetitle}>
            Login
            </Typography>
            <form noValidate onSubmit={this.handlesubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
             {errors.general && (<Typography  variant="body2" className={classes.errorhandle}>{errors.general}</Typography>)}
             <Button variant="contained" color="primary" disabled={ loading}type="submit" className={classes.button}>
                Login {loading && (<CircularProgress size={30} className={classes.progress}/>)}
             </Button>
             <br/>
             <small>Don't have an Account? Sign up <Link to="/signup">here</Link></small>
            
             </form>
            
            </Grid>
            <Grid item sm></Grid>
            </Grid>
        )
    }
}
Login.propTypes={
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired,
    loginuser:PropTypes.func.isRequired
}

const mapstatetoprops=state=>({
   user:state.user,
   ui:state.UI
})
const mapactiontoprops={
    loginuser
}

export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(Login))