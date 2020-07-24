import React, { Component } from 'react'
import Grid  from '@material-ui/core/Grid'

import Streams from '../components/streams'
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import {getstreams} from '../redux/actions/dataaction'
import PropTypes from 'prop-types'
import Streamskeleton from './streamskeleton'

class Home extends Component {
    
    
    componentDidMount(){
       
        this.props.getstreams()
    }
    render() {
        const {data:{loading,streams}}=this.props
        let recentstream=!loading?(streams.map(streams=>(
        <Streams key={streams.setid} stream={streams}/> ))):(<Streamskeleton/>);
        return (
            <Grid container spacing={3}>
              <Grid item sm={8} xs={12}>
                   {recentstream}
              </Grid>
              <Grid item sm={4} xs={12}>
                  <Profile></Profile>
              </Grid>

            </Grid>
        )
    }
}
Home.propTypes={
    data:PropTypes.object.isRequired,
    getstreams:PropTypes.func.isRequired
}
const mapstatetoprops=state=>({
    data:state.data
})
const mapactiontoprops={
    getstreams
}

export default connect(mapstatetoprops,mapactiontoprops)(Home)
