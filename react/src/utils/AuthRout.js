import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
const AuthRout = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
AuthRout.propTypes={
  user:PropTypes.object
}
const mapstatetoprops=state=>({
  authenticated:state.user.authenticated
})
export default connect(mapstatetoprops)(AuthRout)