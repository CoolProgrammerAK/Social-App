import React, { Component, Fragment } from 'react'
import PropTypes from  'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Noimg from '../images/no-img.png'
import withStyles from '@material-ui/core/styles/withStyles'
const styles=theme=>({
    card:{
        display:'flex',
        marginBottom:20

    },
    cardContent:{
        width:'100%',flexDirection:'column',padding:'40',margin:'19'
    },
    cover:{
        minWidth:200,objectFit:'cover'
    },
    fullLine:{
        height:15,
        width:'90%',
        marginBottom:10,backgroundColor:'rgba(0,0,0,0.4)'
    },
    date:{
        height:14,
        width:100,marginBottom:10,
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    fullLine:{
        height:15,
        width:'90%',
        marginBottom:10,backgroundColor:'rgba(0,0,0,0.4)'
    },
    halfLine:{
        height:15,
        width:'50%',
        marginBottom:10,backgroundColor:'rgba(0,0,0,0.4)'
    }
})
export class streamskeleton extends Component {
    render() {
        const {classes}=this.props
        const content=Array.from({length:5}).map((item,index)=>(
            <Card className={classes.card} key={index}>
                <CardMedia className={classes.cover} image={Noimg}/>
                <CardContent className={classes.cardContent}>
                    <div className={classes.handle}/>
                    <div className={classes.date}/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <div className={classes.halfLine}/>
                </CardContent>
            </Card>
        ))
        return (
           <Fragment>{content}</Fragment>
        )
    }
}
streamskeleton.propTypes={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(streamskeleton)
