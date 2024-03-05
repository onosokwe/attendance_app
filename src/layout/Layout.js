import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { SideBarItems } from "./Sidebar";
import {
  Typography,
  Avatar,
  Tooltip,
  withStyles,
  darken,
  Hidden,
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Grid,
  fade,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Skeleton from "@material-ui/lab/Skeleton";
import shadows from "@material-ui/core/styles/shadows";
import ToggleIcon from "material-ui-toggle-icon";

import { getLoggedInUser, logoutUser } from "../utils/helper";
import logo from '../assets/logo.png';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexDirection: "column",
    // minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
    // background: "rgba(22, 28, 36, 0.72)",
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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
    color: "#0064f8"
  },
  menuButtonHidden: {
    display: "none",
    color: "#0064f8"
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    backgroundRepeat: "no-repeat",
    backgroundColor: `${theme.palette.type === "dark"
      ? darken("#888", 0.05)
      : darken("#3b3bce", 0.05)
      }`,
    color: "rgba(255, 255, 255, 0.87)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    height: "100vh",
    // overflowY: "auto",
  },
  scrollable: {
    overflowY: "auto",
    height: "100vh",
    "&::-scrollbar-track": {
      borderWidth: "1px",
      borderColor: "#fff",
      borderStyle: "solid",
      backgroundColor: "#fff",
      padding: "2px",
    },
    "&::-scrollbar": {
      width: "10px",
      display: "none",
      backgroundColor: "#424858",
    },
    "&::-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.2)",
      borderStyle: "solid",
      borderColor: "#f7f7f7",
      borderWidth: "1px",
    },
    "&::-moz-scrollbar-track": {
      borderWidth: "1px",
      borderColor: "#fff",
      borderStyle: "solid",
      backgroundColor: "#fff",
      padding: "2px",
    },
    "&::-moz-scrollbar": {
      width: "10px",
      display: "none",
      backgroundColor: "#424858",
    },
    "&::-moz-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.2)",
      borderStyle: "solid",
      borderColor: "#f7f7f7",
      borderWidth: "1px",
    },
    "&::-webkit-scrollbar-track": {
      borderWidth: "1px",
      borderColor: "#fff",
      borderStyle: "solid",
      backgroundColor: "#fff",
      padding: "2px",
    },
    "&::-webkit-scrollbar": {
      width: "10px",
      display: "none",
      backgroundColor: "#424858",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.2)",
      borderStyle: "solid",
      borderColor: "#f7f7f7",
      borderWidth: "1px",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0),
    },
    [theme.breakpoints.up("xs")]: {
      width: theme.spacing(0),
    },
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

  contentInner: {
    height: "100vh",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: 24,
    paddingRight: 24,
    width: "100%",
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    // position: "absolute",
    fill:
      theme.palette.type === "light"
        ? theme.palette.background.paper
        : "#f5f5f5",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  },
  footerText: {
    fontSize: 13,
    lineHeight: 1.5,
    letterSpacing: 0.2,
    // color: "#bdbdbd",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  bottomCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px 8px",
    height: "100%",
    // width: "80%",
    background: darken("#182653", 0.2),
    color: theme.palette.background.paper,
  },
  btnCard: {
    color: theme.palette.background.paper,
  },
  notifyWrapper: {
    paddingBottom: 0,
  },
  notifyHeader: {
    padding: theme.spacing(1),
    backgroundColor: "#fbc02d",
    backgroundImage:
      "linear-gradient(145deg, rgba(232, 87, 237, 0.15) 0%,rgba(109, 137, 69, 0.15) 100%),linear-gradient(75deg, rgb(33, 138, 184),rgb(0, 241, 181))",
    height: "100%",
    marginTop: -10,
  },
  notifyMenu: {
    width: 400,
    maxHeight: 400,
    height: "auto",
    overflow: "auto",
    padding: theme.spacing(2),
    marginBottom: -8,
    backgroundImage:
      theme.palette.type === "light"
        ? "repeating-linear-gradient(284deg, transparent 0px, transparent 1px,rgb(251,251,251) 1px, rgb(251,251,251) 3px),repeating-linear-gradient(14deg, transparent 0px, transparent 1px,rgb(251,251,251) 1px, rgb(251,251,251) 3px),linear-gradient(90deg, rgb(222,222,222),rgb(222,222,222))"
        : "repeating-linear-gradient(45deg, rgba(0,0,0, 0.1) 0px, rgba(0,0,0, 0.1) 2px,transparent 2px, transparent 4px),linear-gradient(90deg, rgb(66,66,66),rgb(66,66,66),rgb(66,66,66))",
    "& > *": {
      padding: "10px 0",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  notifyTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // color: "#7e7e7e",
    paddingLeft: 8,
    color: "#fff",
    fontSize: 14,
    letterSpacing: 2.5,
    "& > a": {
      color: "inherit",
    },
  },
  notifyTitle2: {
    letterSpacing: 2.5,
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.type === "light" ? "#333333" : "#c5c5c5",
    textDecoration: "underline",
    cursor: "pointer",
  },
  notifyMsg: {
    color: theme.palette.type === "light" ? "#333333" : "#c5c5c5",
    fontSize: 14,
  },
  notifyDate: {
    // color: "#868686",
    color: "#8f8e8e",
    fontSize: 12,
    marginTop: 10,
  },
  notifyItem: {
    // borderBottom: "1px solid #dadada",
    padding: theme.spacing(2),
    marginBottom: 5,
    cursor: "pointer",
    boxShadow: theme.shadows[1],
    "&:hover": {
      boxShadow: shadows[3],
      background:
        theme.palette.type === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey.A700,
    },
  },
  hide: {
    display: "none",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  avatarHeader: {
    textAlign: "center",
    display: "grid",
    justifyItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  small: {
    color: theme.palette.type === "light" ? "#bdbdbd" : "#fff",
    fontSize: 14,
  },
  name: {
    color: theme.palette.type === "light" ? "#757575" : "#fff",
    letterSpacing: 1.8,
    fontSize: 11,
  },
  dropdown: {
    
  },
  logotitle: {
    color:
      theme.palette.type === "light"
        ? fade(theme.palette.common.black, 0.8)
        : "#fff",
    fontWeight: 900,
    marginLeft: 5,
  },
  logoAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  logoText: {
    fontWeight: 900,
    letterSpacing: 1.5,
    fontSize: 16,
    color:
      theme.palette.type === "light"
        ? fade(theme.palette.common.black, 0.75)
        : "#fff",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  naming: {
    color: "#bdbdbd",
    marginRight: 5,
    fontSize: 10.5,
    fontWeight: 900,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  ship: {
    width: 100,
    height: 100,
  },
  zeroContainer: {
    padding: theme.spacing(0.5),
  },
  zeroNotify: {
    display: "block",
    margin: "30px 0",
    letterSpacing: 2.5,
    fontSize: 16,
    lineHeight: 1.7,
  },
  animate: {
    animation: "1s cubic-bezier(.72,-0.1,0,1.57) both alternate $rotate",
  },
  animateReverse: {
    animation: "1s cubic-bezier(.68,.53,.57,1.53) both $rotateReverse ",
  },
  "@keyframes rotate": {
    "0%": {
      opacity: 0.09,
      transform: "scale(0.9) rotate(0deg)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1) rotate(360deg)",
    },
  },
  "@keyframes rotateReverse": {
    "0%": {
      opacity: 0.09,
      transform: "rotate(0deg)",
    },

    "50%": {
      transform: "rotate(-40deg)",
    },

    "100%": {
      opacity: 1,
      transform: "rotate(0deg)",
    },
  },

  notificationContainer: {
    marginBottom: 20,
  },
  bellAnimate: {
    animation: "$ring 4s  ease-in-out forwards",
  },

  "@keyframes ring": {
    "0%": { transform: "rotate(0)" },
    "1%": { transform: "rotate(30deg)" },
    "3%": { transform: "rotate(-28deg)" },
    "5%": { transform: "rotate(34deg)" },
    "7%": { transform: "rotate(-32deg)" },
    "9%": { transform: "rotate(30deg)" },
    "11%": { transform: "rotate(-28deg)" },
    "13%": { transform: "rotate(26deg)" },
    "15%": { transform: "rotate(-24deg)" },
    "17%": { transform: "rotate(22deg)" },
    "19%": { transform: "rotate(-20deg)" },
    "21%": { transform: "rotate(18deg)" },
    "23%": { transform: "rotate(-16deg)" },
    "25%": { transform: "rotate(14deg)" },
    "27%": { transform: "rotate(-12deg)" },
    "29%": { transform: "rotate(10deg)" },
    "31%": { transform: "rotate(-8deg)" },
    "33%": { transform: "rotate(6deg)" },
    "35%": { transform: "rotate(-4deg)" },
    "37%": { transform: "rotate(2deg)" },
    "39%": { transform: "rotate(-1deg)" },
    "41%": { transform: "rotate(1deg)" },

    "43%": { transform: "rotate(0)" },
    "100%": { transform: "rotate(0)" },
  },
  textUpper: {
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontSize: 10,
    position: "relative",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Layout = ({
  children,
  toggleDarkTheme,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [profile, setProfile] = React.useState(null);

  const theme = useTheme();
  const history = useHistory();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const TOKEN = localStorage.getItem("kloka:token:data");

  // °
  React.useEffect(() => {
    setLoader((prev) => !prev);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  const getProfileCallback = React.useCallback(() => {
    setOpenBackdrop((prev) => !prev);
    getLoggedInUser(TOKEN).then((res) => {
      setProfile(res.data.data);
      console.log("Logged In");
      setOpenBackdrop(false);
    }).catch((err)=>{
      console.log(err.response)
    });
  }, [TOKEN]);

  React.useEffect(() => {
    setOpenBackdrop((prev) => !prev);

    getProfileCallback(() => {
      setOpenBackdrop(false);
    });
  }, [getProfileCallback]);

  React.useEffect(() => {
    if (matches) {
      setOpen((prev) => !prev);
    } else {
      setOpen(true);
    }
  }, [matches]);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setOpenBackdrop(true);
    logoutUser(TOKEN)
      .then((res) => {
        localStorage.removeItem("kloka:token:data");
        localStorage.removeItem("kloka:token:type");
        localStorage.removeItem("rememberme");
        localStorage.removeItem("welcome");
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        handleMenuClose();
      })
      .catch((err) => {
        localStorage.removeItem("kloka:token:data");
        localStorage.removeItem("kloka:token:type");
        localStorage.removeItem("rememberme");
        localStorage.removeItem("welcome");
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        handleMenuClose();
      });
  };

  const handleMenuRoute = (path) => {
    history.push(path);
    handleMenuClose();
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          width: 300,
        },
      }}
    >
      <div className={classes.avatarHeader}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar
            src={
              (profile && profile.profile_pic) || 
              "/img/user.svg"
            }
          />
        </StyledBadge>
        <Typography variant="overline" className={classes.name}>
          {(profile && profile.first_name) || `Kloka Employee`}
        </Typography>
        <Typography className={classes.small}>
          {(profile?.email) || `Kloka Employee Email`}
        </Typography>
      </div>
      <Divider />
      {profile && profile.type === "inhouse"? 
      <MenuItem
        onClick={() => handleMenuRoute("/account")}
        className={classes.dropdown}
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Account</Grid>
          <Grid item>
            <AccountCircleIcon style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </MenuItem> : null}

      <MenuItem onClick={handleLogout} className={classes.dropdown}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Logout</Grid>
          <Grid item>
            <PowerSettingsNewIcon style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, open && classes.appBarShift)}
        elevation={1}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title}>
            <Grid container alignItems="center">
              <Grid item>
                <img src={logo} alt="Logo" size={matches ? 12 : 15} style={{width: 120}}/>
              </Grid>
            </Grid>
          </div>

          <Box>
            <Tooltip
              title={
                <Typography variant="caption" className={classes.textUpper}>
                  Switch to {theme.palette.type === "light" ? "dark" : "light"}{" "}
                  theme
                </Typography>
              }
              arrow
            >
              <IconButton onClick={toggleDarkTheme}>
                <ToggleIcon
                  on={theme.palette.type === "light" ? false : true}
                  style={{
                    color: "#ffc107",
                  }}
                  className={clsx({
                    [classes.animateReverse]: theme.palette.type === "light",
                    [classes.animate]: theme.palette.type === "dark",
                  })}
                  onIcon={<BrightnessHighIcon />}
                  offIcon={<NightsStayIcon />}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider orientation="vertical" className={classes.divider} />
          <Hidden smDown>
            <Box>
              {loader ? (
                <Skeleton
                  variant="text"
                  width={100}
                  height={10}
                  style={{
                    background: "#e0e0e0",
                    padding: 20,
                    borderRadius: 3,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <span className={classes.naming}>
                  {(profile && profile.first_name && profile.first_name) || ""}  {(profile && profile.last_name && profile.last_name) || ""}
                </span>
              )}
            </Box>
          </Hidden>

          <Hidden mdUp>
            <Box>
              {loader ? (
                <Skeleton
                  variant="text"
                  width={100}
                  height={10}
                  style={{
                    background: "#e0e0e0",
                    padding: 20,
                    borderRadius: 3,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <span className={classes.naming}>
                  {(profile && profile.first_name && profile.first_name) || ""} {(profile && profile.last_name && profile.last_name) || ""}
                </span>
              )}
            </Box>
          </Hidden>

          <IconButton edge="end" onClick={handleProfileMenuOpen}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar
                src={
                  (profile && profile.profile_pic) ||
                  "/img/user.svg"
                }
              />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={"permanent"}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        anchor="left"
      >
        <div className={classes.toolbarIcon} >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className={classes.icon} color="secondary" />
          </IconButton>
        </div>

        <Divider />

        <div className={classes.scrollable} >
          <List>
            <SideBarItems profile={profile} />
          </List>
        </div>
      </Drawer>

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
              href="https://kloka-c2e61353eb09.herokuapp.com/"
              target="__blank"
            >
              The New KLOKA,
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>

        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
      {renderMenu}
    </div>
  );
};


export default Layout;
