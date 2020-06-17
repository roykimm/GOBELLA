import React, { useState } from 'react';
import { AppBar , Toolbar , Typography, Grid, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    typographyStyles : {
        flex : 1,
        marginLeft : "10px"
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
        backgroundColor : "white",
        textAlign : "center",
        padding: theme.spacing(2),

    },
    mainStyle : {
        flexGrow: 1,
        padding : "20px"
    },
    img : {
        margin : "auto",
        display: "block",
        maxWidth : "80%",
        maxHeight : "80%",
    },
    titleStyle : {
        marginTop : "10px",
        fontSize : "20px",
        underline : "hover"
    }

}))

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <HomeIcon />
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
            <img src={props.imageSrc} alt="Girl in a jacket" className={classes.img}/>    
            <Link
                className={classes.titleStyle} 
                component="button"
                variant="body2"
                onClick={() => {alert('you click me')}}
            >
            {props.title}
            </Link>
            <br />
            <Link
                className={classes.contStyle} 
                component="button"
                variant="body2"
                onClick={() => {alert('you click me')}}
            >
            {props.cont}
            </Link>
        </div>
    )
}

const Main = () => {
    let arr = [
        {
            title : '리액트에 관하여',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여2',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여3',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여3',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여3',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여3',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
        {
            title : '리액트에 관하여3',
            publish_dt : '2020.06.15',
            cont : 'dfsafdfsdfdsfdfdfsdfdfdsfdsfdfdfds',
            imageSrc : "https://source.unsplash.com/random"
        },
    ]
    const [ value, setValue ] = useState(arr);
    const classes = useStyles();
    return (
        <div>
            <Header />
            <div className={classes.mainStyle} >
                <Grid container spacing={3}>
                    {value.map((value, index) => (
                        <Grid item xs={6} sm={3}>
                            <MiniPost
                                key={index} 
                                title={value.title}
                                cont={value.cont}
                                publish_dt={value.publish_dt}
                                imageSrc={value.imageSrc} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Footer />
        </div>
    )
}

export default Main;