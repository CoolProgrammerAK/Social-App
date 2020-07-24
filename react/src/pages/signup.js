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
import {signupuser} from '../redux/actions/useraction'
const styles=(theme)=>({...theme.spreadThis})

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",password:"",confirmpassword:"",handle:"",errors:{}
        }
    }
    handlesubmit =event=>{
        event.preventDefault()
      
      const newuserdata={
          email:this.state.email,
          password:this.state.password,
          confirmpassword:this.state.confirmpassword,
          handle:this.state.handle,
      }
      this.props.signupuser(newuserdata,this.props.history)
}
handleChange=e=>{
    this.setState({
        [e.target.name]:e.target.value
    })
    
}
componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
        this.setState({errors:nextProps.ui.errors})
    }
}

    render() { 
       
        const {classes,ui:{loading}}=this.props
        const {errors}=this.state
       
        return (
            <Grid container className={classes.form}>
            <Grid item sm></Grid>
            <Grid item sm><img src={icon} alt="Monkey" className={classes.image}/>
            <Typography variant="h3" className={classes.pagetitle}>
            Sign Up
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
             <TextField
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmpassword}
              error={errors.confirmpassword ? true : false}
              value={this.state.confirmpassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
             {errors.general && (<Typography  variant="body2" className={classes.errorhandle}>{errors.general}</Typography>)}
             <Button variant="contained" color="primary" disabled={ loading}type="submit" className={classes.button}>
                Signup {loading && (<CircularProgress size={30} className={classes.progress}/>)}
             </Button>
             <br/>
             <small>Already had an Account? Log in <Link to="/login">here</Link></small>
            
             </form>
            
            </Grid>
            <Grid item sm></Grid>
            </Grid>
        )
    }
}
Signup.propTypes={
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired,
    signupuser:PropTypes.func.isRequired
}
const mapstatetoprops=state=>({
    user:state.user,
    ui:state.UI

})
const mapactiontoprops={
   signupuser
}


export default connect(mapstatetoprops,mapactiontoprops)(withStyles(styles)(Signup))