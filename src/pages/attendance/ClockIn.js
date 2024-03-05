import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Button,
    ButtonGroup,
    darken,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
// import { alpha } from '@material-ui/core/styles'
import CircularProgress from "@material-ui/core/CircularProgress";
import MyLocationIcon from "@material-ui/icons/MyLocation";
// import AssignmentIcon from "@material-ui/icons/Assignment";
import RoomIcon from "@material-ui/icons/Room";
import usePosition from "../../utils/hooks/usePosition";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GoogleMapReact from "google-map-react";
import { green, red } from "@material-ui/core/colors";
import ClockInModal from "./modals/ClockInModal";
import ClockOutModal from "./modals/ClockOutModal";
import { useHistory } from "react-router-dom";
import Feedback from "../../components/Feedback";
import axios from "axios";
import { getLoggedInUser, getMyLastClockin, getUserRadius } from "../../utils/helper";

const AnyReactComponent = () => (
    <div>
        <RoomIcon color="secondary" fontSize="large" />
    </div>
);

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        backgroundColor:'#f0f0f0',
    },
    btnGroup: {
        marginTop: 30,
    },
    container: {
        marginTop: 60,
        marginBottom: 100,
    },
    title: {
        fontWeight: "bold",
        display: "block",
    },
    title2: {
        fontWeight: 600,
        display: "block",
        color: "#8e9195",
        fontSize: 20,
    },
    flex: {
        display: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    info: {
        background: theme.palette.common.black,
        color: theme.palette.background.paper,
        textAlign: "center",
        padding: theme.spacing(2),
    },
    message: {
        fontFamily: "Rubik",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
        fontSize: 13,
        },
    },
    successInfo: {
        color: green[800],
        display: "block",
    },
    errorInfo: {
        color: red[900],
        display: "block",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    mr3: {
        marginRight: 3,
    },
    greenBtn: {
        background: "#388e3c",
        color: "#fff",
        margin: "30px 0",
        padding: theme.spacing(2),
        fontFamily: "Rubik",
        letterSpacing: 2.5,
        "&:hover": {
        background: darken("#388e3c", 0.15),
        // color: "#fff",
        },
        [theme.breakpoints.down("sm")]: {
        width: "100%",
        fontSize: 10,
        padding: 10,
        },
    },
    icon: {
        width: 50,
        height: 50,
        fill: "#bdbdbd",
        margin: "auto",
    },
    logBtn: {
        marginTop: 20,
        marginRight: 20,
        fontWeight: 900,
        background:
        theme.palette.type === "light"
            ? "#004d40"
            : theme.palette.background.paper,
        color: "#fff",
        "&:hover": {
        background:
            theme.palette.type === "light"
            ? darken("#004d40", 0.9)
            : darken(theme.palette.background.paper, 0.9),
        },
    },
    btn: {
        margin: "30px 0",
        padding: theme.spacing(2),
        fontFamily: "Rubik",
        letterSpacing: 2.5,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            fontSize: 10,
            padding: 10,
        },
    },
}));

const ClockIn = () => {
    const classes = useStyles();
    const history = useHistory();
    const { latitude, longitude, errorMsg } = usePosition();
    const [profile, setProfile] = React.useState(null);
    const [lastClockin, setLastClockin] = useState("'");
    const [radius, setRadius] = useState("'");
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openClockOutModal, setOpenClockOutModal] = useState(false);
    const [address, setAddress] = useState(null);
    const [feed, setFeed] = React.useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const TOKEN = localStorage.getItem("kloka:token:data");

    useEffect(()=>{
        if(TOKEN){
          getLoggedInUser(TOKEN).then((res) => {
            setProfile(res.data.data);
            console.log("Logged In");
          });
        }else {
          history.push("/");
        }
    },[TOKEN, history]);

    useEffect(() => {
        getMyLastClockin().then((res) => {
            setLastClockin(res.data?.data?._id);
        }).catch((err)=> {
            console.log(err.response)
        })
    },[]);
  
  const getAddressCallback = React.useCallback(() => {
        if (latitude || longitude) {
        axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
        .then((res) => {
            setAddress(res.data.display_name)
        }).catch((err)=> {
            console.log(err)
        })
        }
    }, [latitude, longitude]);

    React.useEffect(() => {
        getAddressCallback();
    }, [getAddressCallback]);

  const radiusCallback = React.useCallback(
    (opts = {}) => {
      if (navigator) {
        navigator.geolocation.getCurrentPosition(
          (cur) => {
            let { latitude, longitude } = cur.coords;
            setLoading(true)
            getUserRadius(latitude, longitude, opts, TOKEN).then((res) => {
              setRadius(res.data);
              // console.log(res.data)
              setLoading(false)
            }).catch((err)=> {
                console.log(err.response)
            })
          },
          (err) => {
            setFeed((prev) => ({
              ...prev,
              loading: false,
              open: true,
              message: err.message,
              success: false,
            }));
          }
        );
      }
    },
    [TOKEN]
  );

  React.useLayoutEffect(() => {
    const abortController = new AbortController();
    const opts = { signal: abortController.signal };
    radiusCallback(opts);
    return () => {
      abortController.abort();
    };
  }, [radiusCallback]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClockOutOpenModal = () => {
    setOpenClockOutModal(true);
  };
  const handleClockOutCloseModal = () => {
    setOpenClockOutModal(false);
  };

  const validateAddress = () => {
    setLoading(true)  
      const abortController = new AbortController();
      const opts = { signal: abortController.signal };
      radiusCallback(opts);
      setTimeout(() => {
        setLoading(false)
      }, 2500);
      return () => {
        abortController.abort();
      };
  };

  let disableScanBtn = () => radius && radius.message;

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <div className={classes.root}>
      {feed.success ? (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={feed.open}
          severity="success"
          message={feed.message}
        />
      ) : (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={feed.open}
          severity="error"
          message={feed.message}
        />
      )}
      <ClockInModal {...{ openModal, handleCloseModal, address, latitude, longitude }} />
      <ClockOutModal {...{ openClockOutModal, handleClockOutCloseModal, lastClockin }} />

      <div style={{ height: "50vh", width: "100%", background: "#ccc" }}>
        {latitude !== undefined && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDCdpFFMKE2MkC_zmTbyNpBpVJUGbMG98w",
            }}
            center={{
              lat: latitude,
              lng: longitude,
            }}
            defaultZoom={16}
          >
            <AnyReactComponent
              lat={latitude}
              lng={longitude}
              text="My Marker"
            />
          </GoogleMapReact>
        )}
      </div>
      <Divider light />
      <div className={classes.info}>
        <Typography className={classes.message}>
          <MyLocationIcon className={classes.mr3} />
          Always enable location on your device.
        </Typography>
      </div>
      {/* <Grid container justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Button
            size="small"
            className={classes.logBtn}
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={() => history.push("/attendances")}
          >
            View Log
          </Button>
        </Grid>
      </Grid> */}
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item>
            <div className={classes.flex}>
              <Typography className={classes.title}>
                Your Location
              </Typography>
              {/* <Typography className={classes.title}>
                {exact ? exact : "Finding your location"}
              </Typography> */}
              <RoomIcon />
            </div>
            <Typography gutterBottom className={classes.flex}>
              {address ? address : errorMsg  || "Finding your location"}
              {/* <span>{address ? address : errorMsg || "No Location Found"}</span> */}
            </Typography>

            {radius && radius.message === true ? (
              <Typography
                gutterBottom
                className={classes.successInfo}
                variant="overline"
              >
                {loading
                  ? "Loading..."
                  : profile && profile.attendanceStatus === "clocked in"
                  ? "You're currently within the office perimeter to clock out."
                  : "You're currently within the office perimeter to clock in."}
              </Typography>
            ) : (
              <Typography
                gutterBottom
                className={classes.errorInfo}
                variant="overline"
              >
                {loading
                  ? "Loading..."
                  : profile && profile.attendanceStatus === "clocked out"
                  ? "You're NOT within the office perimeter to clock in."
                  : "You're NOT within the office perimeter to clock out."}
              </Typography>
            )}

            <ButtonGroup>
              {profile && profile.attendanceStatus === "clocked out" ? (
                <Button
                  onClick={handleOpenModal}
                  endIcon={<AccessTimeIcon />}
                  disabled={!disableScanBtn()}
                  className={classes.greenBtn}
                  variant="contained"
                >
                  Clock In
                </Button>
              ) : (
                <Button
                  onClick={handleClockOutOpenModal}
                  endIcon={<AccessTimeIcon />}
                  disabled={!disableScanBtn()}
                  color="secondary"
                  variant="contained"
                  className={classes.btn}
                >
                  Clock Out
                </Button>
              )}
              <Button
                onClick={validateAddress}
                color="primary"
                variant="contained"
                className={classes.btn}
              >
                Validate Location
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default ClockIn;
