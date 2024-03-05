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
  darken,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import moment from "moment";
// import { useSelector } from "react-redux";
import { clockStaffIn } from "../../../utils/helper";
import Clock from "react-clock";
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
    background: "#388e3c",
    color: "#fff",
    margin: "30px 0",
    padding: theme.spacing(2),
    minWidth: 200,
    width: "100%",
    fontFamily: "Rubik",
    letterSpacing: 2.5,
    "&:hover": {
      background: darken("#388e3c", 0.15),
      // color: "#fff",
    },
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

const ClockInModal = ({ openModal, handleCloseModal, address, latitude, longitude }) => {
  const classes = useStyles();
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const timer = React.useRef();
  // const { clockInError } = useSelector((state) => state.attendance);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showTimeCallback = React.useCallback(() => {
    setTime(moment().format("LTS"));
    timer.current = setTimeout(showTimeCallback, 1000);
  }, []);

  React.useEffect(() => {
    showTimeCallback();
    return () => clearTimeout(timer.current);
  }, [showTimeCallback]);

  // useEffect(() => {
  //   if (clockInError && clockInError !== null) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: clockInError,
  //     });
  //   }
  // }, [clockInError]);

  const onClockIn = async () => {
    if(address){
      const data = {
        office: address,
        latitude,
        longitude
      }
      setLoading(true);

      await clockStaffIn(data).then((res)=> {
        if(res.data.success){
          setTimeout(() => {
            handleCloseModal();
          }, 1000);

          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: `You're now clocked in at ${moment().format("LTS")}.`,
            });
          }, 2000);
          setLoading(false);
        }
      }).catch((err) => {
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${err.response.data.error}`,
          });
        }, 3000);
        setLoading(false);
      });

      setTimeout(() => {
        window.location.reload();
      }, 5000);
      
    }
  };
  
  return (
    <div>
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="simple-dialog-title"
        open={openModal}
        fullWidth
      >
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="overline" className={classes.title}>
                Clock In
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip arrow title="Close">
                <IconButton onClick={handleCloseModal}>
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
                onClick={onClockIn}
                color="primary"
                variant="contained"
                className={classes.btn}
                disabled={loading}
              >
                {loading ? "Loading..." : "Clock In"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClockInModal;
