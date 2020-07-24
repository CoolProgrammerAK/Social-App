import React from 'react';
import {Route,BrowserRouter,Switch} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import {createMuiTheme} from '@material-ui/core/styles'
import Navbar from './components/navbar';
import themefile from './utils/theme'
import jwtDecode from 'jwt-decode'
import AuthRout from './utils/AuthRout'
import store from './redux/store'
import {Provider} from 'react-redux'
import {SET_AUTHENTICATED} from './redux/type'
import {logout,getuser} from './redux/actions/useraction'
import axios from 'axios'
import User from './components/user' 
const theme=createMuiTheme(themefile)
axios.defaults.baseURL="https://us-central1-socialapp-c54a0.cloudfunctions.net/api"
const token=localStorage.FBidtoken
if (token){
  const decodedtoken=jwtDecode(token)
  
  if(decodedtoken.exp*1000<Date.now()){
    //window.location.href='/login'
    store.dispatch(logout())
  }
  else{
    store.dispatch({type:SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization']=token
    store.dispatch(getuser())
  }
}
function App() {
  return (
    
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar></Navbar>
            <div className="container">
              
              <Switch>
                <Route path="/" exact component={Home} ></Route>
                <AuthRout path="/login" exact component={Login}></AuthRout>
                <AuthRout path="/signup" exact component={Signup}></AuthRout>
                <Route path="/users/:handle" exact component={User}></Route>
                <Route path="/users/:handle/streams/:streamid" exact component={User}></Route>
              </Switch>
            </div>
            
          </BrowserRouter>
          </Provider>
      </MuiThemeProvider>
     
  );
}

export default App;
