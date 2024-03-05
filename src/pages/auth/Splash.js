import React from "react";
import { lighten, makeStyles, withStyles, Typography, darken } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    width: 300,
    border: "2px solid #fff",
    backgroundColor: lighten("#fefefe", 0.5),
    borderRadius: 20,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#ff6c5c",
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: "url(/img/bg_image.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundColor: "#0064f8",
    backgroundColor: darken("#0064f8", 1.5),
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "grid",
    justifyContent: "center",
  },
  white: {
    color: "#fefefe",
  },
  margin: {
    margin: theme.spacing(1),
  },
  spacing: {
    letterSpacing: 2,
  },
  textTransform: {
    textTransform: "uppercase",
  },
}));

export const Splash = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.loader}>
        <Typography
          variant="h6"
          component="h6"
          className={clsx(
            classes.white,
            classes.spacing,
            classes.textTransform
          )}
        >
          Loading
        </Typography>
        <div>
          <BorderLinearProgress
            className={classes.margin}
            // variant="determinate"
            color="secondary"
            value={100}
          />
        </div>
      </div>
    </div>
  );
};
