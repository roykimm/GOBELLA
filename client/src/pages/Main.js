import React, { useState } from 'react';
import { AppBar , Toolbar , Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    typographyStyles : {
        flex : 1
    },
    footerStyle : {
        position: "fixed",
        backgroundColor : "gray",
        left : 0,
        bottom : 0,
        width : "100%",
        minHeight : "50px",
        paddingLeft : 10,
        paddingTop : 20,
    },
    footerTextStyle : {
        textAlign : "center"
    },
    minipostStyle : {
        width : "300px",
        height : "200px",
        backgroundColor : "white",
        border : "1px solid black"
    }

}))

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    RoyKimmyunghoon's Blog
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footerStyle}>
            <Typography className={classes.footerTextStyle}>
            copyrightⓒ 2008 All rights reserved by RoyKimmyunghoon
            </Typography>
        </div>
    )
}

const MiniPost = props => {
    const classes = useStyles();

    return (
        <div className={classes.minipostStyle}>
            <h4>{props.title}</h4>
            <div>{props.cont}</div>
        </div>
    )
}

const Main = () => {
    let arr = [
        {
            title : '리액트에 관하여',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds'
        },
        {
            title : '리액트에 관하여2',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds'
        }
    ]
    const [ value, setValue ] = useState(arr);
    return (
        <div>
            <Header />
            {value.map(arr => (
                <MiniPost
                    title={arr.title}
                    cont={arr.cont}
                    publish_dt={arr.publish_dt} 
                />
            ))}
            <Footer />
        </div>
    )
}

export default Main;