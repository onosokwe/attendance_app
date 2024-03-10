import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Typography,
  Backdrop,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
  },
  toolbar: {
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    minHeight: 64,
  },
  appBar: {
    background:
      theme.palette.type === "light"
        ? "rgba(250, 250, 250, 0.50)"
        : "rgb(59 59 59 / 55%)",
    backdropFilter: "blur(10px)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
  },

  container: {
    paddingTop: 0, //theme.spacing(4),
    paddingBottom: 0, // theme.spacing(4),
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },

  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  },
  footerText: {
    fontSize: 13,
    lineHeight: 1.5,
    letterSpacing: 0.2,
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

}));

const Layout = ({ children  }) => {
  const classes = useStyles();
  const [loader, setLoader] = React.useState(false);
  
  React.useEffect(() => {
    setLoader((prev) => !prev);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar)}
        elevation={1}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Grid container alignItems="center">
              <Grid item>
                <img src={logo} alt="Logo" size={12} style={{width: 120}}/>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>  

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <div className={classes.container}>{children}</div>

        <Box pt={4} className={classes.footer}>
          <Typography
            // variant="body2"
            // color="textSecondary"
            align="center"
            className={classes.footerText}
          >
            Copyright &copy;{" "}
            <a
              style={{ color: "inherit" }}
              href="https://kloka2-5dd52afa05a1.herokuapp.com/"
              target="__blank"
            >
              KLOKA,
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>

        <Backdrop className={classes.backdrop} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </div>
  );
};


export default Layout;
