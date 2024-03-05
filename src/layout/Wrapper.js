import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Rubik",
    },
}));

export const Wrapper = ({ children, ...props }) => {
    const classes = useStyles();
    return <div className={classes.root}>
        {children}
    </div>;
};
