
import React from "react";
import errorImage from "../Assets/anotando.gif";
import {Typography,makeStyles} from "@material-ui/core"



const useStyles = makeStyles((theme) => ({
   
    errorImage:{
        width: "40vw",
        marginTop: "5vw",
        borderRadius: "5vw"
    }
  }));

export  default function Loading(){
    const classes = useStyles();
    return( <Typography align="center"><img src={errorImage} className={classes.errorImage}/></Typography>)
}
