import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  makeStyles,
  IconButton,
  Tooltip,
  Button,
  Grid,
  Typography,
  DialogTitle,
  DialogActions,
  Divider,
  Paper,
} from "@material-ui/core";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

// import { useSelector } from "react-redux";
import Clock from "react-clock";
import { getLoggedInUser, clockStaffOut } from "../../../utils/helper";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(6),
    paddingBottom: 0
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  btn: {
    // margin: theme.spacing(3),
    margin: "30px 0",
    padding: theme.spacing(2),
    minWidth: 200,
    width: "100%",
    fontFamily: "Rubik",
    letterSpacing: 2.5,
  },
  title: {
    fontSize: 14,
  },
  time: {
    // marginLeft: "auto",
    marginTop: 10,

    // width: 120,
    width: 130,
    height: 40,
    padding: theme.spacing(1),
    // textAlign: "center",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
}));

const ClockOutModal = ({ openClockOutModal, handleClockOutCloseModal, lastClockin }) => {
  const classes = useStyles();
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(null);
  const timer = React.useRef();
  const [profile, setProfile] = React.useState(null);
  const TOKEN = localStorage.getItem("kloka:token:data");
  const [loading, setLoading] = useState(true);
  // console.log(lastClockin)
  // const { clockOutError } = useSelector((state) => state.attendance);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getLoggedInUser(TOKEN).then((res) => {
      setProfile(res.data.data);
    });
  }, [TOKEN]);

  useEffect(() => {
    if(!lastClockin && !profile){
      setLoading(true);
    }else{
      setLoading(false);
    }
  }, [lastClockin, profile]);

  const showTimeCallback = React.useCallback(() => {
    setTime(moment().format("LTS"));
    timer.current = setTimeout(showTimeCallback, 1000);
  }, []);

  React.useEffect(() => {
    showTimeCallback();
    return () => clearTimeout(timer.current);
  }, [showTimeCallback]);

  // useEffect(() => {
  //   if (clockOutError && clockOutError !== null) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: clockOutError,
  //     });
  //   }
  // }, [clockOutError]);

  const onClockOut = async () => {
    setLoading(true)
    const data = {time, lastClockin, id: profile._id};

    await clockStaffOut(data)
      .then((res) => {
      if(res.data.success){
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: `You're now clocked out at ${moment().format("LTS")}.`,
          });
        }, 2000);
      }
    });

    setTimeout(() => {
      handleClockOutCloseModal();
    }, 3000);

    setTimeout(() => {
      window.location.reload();
    }, 6000);
    
  };
  return (
    <div>
      <Dialog
        onClose={handleClockOutCloseModal}
        aria-labelledby="simple-dialog-title"
        open={openClockOutModal}
        fullWidth
      >
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="overline" className={classes.title}>
                Clock Out
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip arrow title="Close">
                <IconButton onClick={handleClockOutCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Clock value={value} renderNumbers={true} />
              <Paper className={classes.time} variant="outlined" square>
                <WatchLaterIcon className={classes.icon} />
                <Typography variant="subtitle2">{time}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Button
                onClick={onClockOut}
                color="secondary"
                variant="contained"
                className={classes.btn}
                disabled={loading}
              >
                {loading ? "Loading..." : "Clock Out"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClockOutModal;
