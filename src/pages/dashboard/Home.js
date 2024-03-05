import React from "react";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  darken,
  Icon,
  IconButton,
  Chip,
  Tooltip,
  CardHeader,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import WelcomeFeedback from "../../components/WelcomeFeedback";
import moment from "moment";
import Feedback from "../../components/Feedback";
import { useHistory } from "react-router-dom";
import birthdays from "../../assets/birthdays.svg";

import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
// import { sendNotif } from "../../../utils/helper";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Rubik",
  },
  paper: {
    padding: theme.spacing(3),
    // height: 120,
    marginBottom: 20,
  },
  alerts: {
    color: theme.palette.type === "dark" ? "#bdbdbd" : "#4d72de",
    fontSize: 12,
    fontWeight: "normal",
    display: "block",
  },
  images:{
    marginTop: 70,
    height: 90,
    width: 90,
  },
  year:{
    height: 320,
    width: "100%"
  },
  alertInfo: {
    fontSize: 12,
    fontWeight: "normal",
    display: "block",
    color: theme.palette.type === "dark" ? "#bdbdbd" : "#5a5c69",
  },
  analytics: {
    fontWeight: 400,
    fontSize: 18,
    letterSpacing: 2.5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    maxWidth: 600,
    "&:after": {
      content: "''",
      position: "absolute",
      width: 70,
      borderRadius: 5,
      background: "#ccc",
      height: 2,
      flex: 1,
      display: "block",
      top: "45%",
      left: "102%",
      [theme.breakpoints.down("sm")]: {
        width: 50,
      },
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: 5,
      borderRadius: 5,
      background: "#ccc",
      height: 2,
      flex: 1,
      display: "block",
      top: "45%",
      right: "102%",
      [theme.breakpoints.down("sm")]: {
        width: 3,
      },
    },
  },
  overview: {
    // color: darken(theme.palette.common.white, 0.3),
    textTransform: "uppercase",
    fontWeight: 400,
    letterSpacing: 2.5,
  },
  date: {
    // marginLeft: 10,
    padding: 10,
    // background: "#07a4ace3",
    // color: "#fff",
    fontWeight: 900,
    fontSize: 12,
  },
  gridContainer: {
    // width: "100%",
    // padding: theme.spacing(4),
    // marginTop: 30,
  },
  mt20: {
    marginTop: 20,
  },
  gridContainer2: {
    // padding: theme.spacing(4),
    marginTop: 10,
  },
  amount: {
    color: darken(theme.palette.common.white, 0.5),
  },
  amountGradient: {
    color: "#ffffff",
    fontWeight: 900,
  },
  header: {
    color: "#9e9e9e",
    fontFamily: "'Rubik', Roboto, 'Quicksand'",
    textTransform: "uppercase",
  },
  infoText: {
    fontWeight: 600,
    color: darken(theme.palette.common.white, 0.3),
    letterSpacing: 2.5,
    fontSize: 11,
  },
  wrapper: {
    marginTop: 30,
  },
  card: {
    // width: "100%",
    textAlign: "center",
    padding: theme.spacing(0),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  time: {
    marginLeft: 5,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
    fontSize: 12,
    maxWidth: 150,
  },
  helloText: {
    color: "#bdbdbd",
    fontSize: "1.75rem",
    letterSpacing: 2.5,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.45rem",
    },
  },

  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  currency: {
    fontWeight: 400,
    lineBreak: "anywhere",
    lineHeight: 1,
    fontSize: 18,
    maxWidth: 250,
  },
  icons: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50,
    border: "5px solid #ccc",
  },
  cardTitle: {
    // padding: 16,
    letterSpacing: 2.5,
  },
  cardTitle2: {
    color: "rgb(82 46 39 / 81%)",
    letterSpacing: 8.5,
    fontWeight: 900,
    fontSize: 32,
    display: "block",
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: 27,
    },
  },
  cardTitle3: {
    // color: "#333",
    letterSpacing: 2.5,
    fontSize: 33,
    fontWeight: 300,
    display: "block",
    lineHeight: 1.5,
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      fontSize: 28,
    },
  },
  cardContent: {
    overflow: "auto",
    padding: 16,
  },
  chartIcon: {
    position: "absolute",
    top: 20,
  },
  btn: {
    padding: theme.spacing(2),
    letterSpacing: 2.5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  left: {
    textAlign: "right",
    display: "block",
    fontSize: 12,
    fontStyle: "italic",
  },
  hse: {
    background: "#1cc88a",
    color: "#fff",
  },
  attendance: {
    // background: "#4e73df",
    backgroundColor: "#4158D0",
    backgroundImage: "linear-gradient(293deg, #4158D0 0%, #0e50b3 13%)",
    color: "#fff",
  },
  glass: {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur(8.0px)",
    WebkitBackdropFilter: "blur(8.0px)",
    borderRadius: "10px",
  },
  hazard: {
    background: "#36b9cc",
    color: "#fff",
  },
  safety: {
    background: "#f6c23e",
    color: "#fff",
  },

  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  icon: {
    width: 50,
    height: 50,
    fill: "#bdbdbd",
  },
  typo: {
    fontWeight: "normal",
  },
  permit: {
    background: "#e74a3b",
    color: "#fff",
  },
  emergency: {
    background: "#9932cc",
    color: "#fff",
  },
  statusDarkGreen: {
    borderColor: "#4caf50",
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  statusGreen: {
      borderColor: "#1de9b6",
      backgroundColor: "#1de9b6",
      color: "#fff",
  },
  statusYellow: {
      borderColor: "#fbc02d",
      backgroundColor: "#fbc02d",
  },
  statusRed: {
      borderColor: "#ef5350",
      backgroundColor: "#ef5350",
      color: "#fff",
  },
  statusOrange: {
      borderColor: "#ff9800",
      backgroundColor: "#ff9800",
  },
}));

const HomePage = ({ error, profile, pending }) => {
    const classes = useStyles();
    const history = useHistory();
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const timer = React.useRef();

    const [feed, setFeed] = React.useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const route = (path) => {
      history.push(path);
    };

    const currentDateCallback = React.useCallback(() => {
        const currentDate = moment(new Date(), "LL").format("dddd, MMMM Do, YYYY");
        setDate(currentDate);
    }, []);

    React.useEffect(() => {
        const abortController = new AbortController();
        currentDateCallback();
        return () => abortController.abort();
    }, [currentDateCallback]);

    const showTimeCallback = React.useCallback(() => {
        setTime(moment().format("LTS"));
        timer.current = setTimeout(showTimeCallback, 1000);
    }, []);

    React.useEffect(() => {
        showTimeCallback();
        return () => clearTimeout(timer.current);
    }, [showTimeCallback]);

    const handleCloseFeed = () => {
        setFeed((prevState) => ({ ...prevState, open: false }));
    };

    return (
        <div className={classes.root}>
            {error && error.error && (
                <Feedback
                    handleCloseFeed={handleCloseFeed}
                    open={error && error.error ? true : false}
                    severity="error"
                    message={(error && error.error) || feed.message}
                    horizontal="center"
                    vertical="bottom"
                />
            )}

            {profile ? <WelcomeFeedback profile={profile} /> : null}
            
            <Grid container justify="space-between" alignItems="center" spacing={1}>
                 <Grid item>
                    <Paper
                        style={{ display: "flex", width: 318 , marginBottom: 20}}
                        component="div"
                        elevation={1}
                        variant="outlined"
                    >
                        <span className={classes.date}>{date}</span>
                        <Divider orientation="vertical" flexItem />

                        <span className={classes.time}>{time}</span>
                    </Paper>
                </Grid>
                
                <Grid item>
                    {profile && profile.type === "inhouse" ?
                        <Button 
                            style={{ display: "flex", marginBottom: 20}}
                            component="div"
                            elevation={1}
                            variant="outlined"
                            onClick={() => history.push("/attendance/clockin")}                      
                            color={profile && profile.attendanceStatus === "clocked in" ? "secondary" : "primary"}
                        >
                        <span>
                            {profile && profile.attendanceStatus === "clocked in" ? "Clock Out" : "Clock In"}
                        </span>
                        </Button> : null}
                </Grid>
            </Grid>

            <Grid
                container
                className={classes.gridContainer}
                justify="center"
                alignItems="center"
                spacing={2}
              >
              
              <Grid item xs={12} md={12}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    variant="h6"
                                    style={{ fontSize: 18, fontWeight: 900 }}
                                    className={classes.header}
                                >
                                    Pending Tasks
                                </Typography>
                            }
                        />
                      <Divider light />
                      
                      <CardContent style={{paddingBottom:0}}>
                        <Grid container spacing={4} style={{minHeight: 250, textAlign:"center", justifyContent:"center", paddingBottom:15}}>
                            {pending.data && pending.data.length > 0 ? 
                                <TableContainer>
                                    <Table className={classes.table} aria-label="custom pagination table">
                                      <TableHead>
                                        <TableRow>
                                            <TableCell>Project</TableCell>
                                            <TableCell>Task</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Assigned To</TableCell>
                                            <TableCell>Deadline</TableCell>                                
                                            <TableCell>Date Created</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>View</TableCell>
                                        </TableRow>
                                    </TableHead>
                                        <TableBody>
                                            {pending.data && pending.data.map((row) => {
                                                return (
                                                    <TableRow key={row._id}>
                                                        <TableCell component="th" scope="row">
                                                            {row?.task_project?.project_title && row?.task_project?.project_title}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row?.task_title && row?.task_title}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row?.task_description && row?.task_description}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row?.assigned_to?.first_name && row?.assigned_to?.first_name} {" "}
                                                            {row?.assigned_to?.last_name && row?.assigned_to?.last_name}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row?.task_deadline && row?.task_deadline}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row?.date && row?.date}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <Chip
                                                                style={{ padding: 10 }}
                                                                label={row.status}
                                                                variant="outlined"
                                                                className={clsx(
                                                                    (row.status === "not started") ? classes.statusRed : 
                                                                        ( (row.status === "in progress") ? classes.statusYellow : 
                                                                            ( ((row.status === "finished") || (row.status === "reassigned")) ? classes.statusGreen :
                                                                                (row.status === "completed" ? classes.statusDarkGreen : classes.statusRed)
                                                                            )
                                                                        ),
                                                                    classes.chip
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <Tooltip arrow title="View Task">
                                                                <IconButton
                                                                    onClick={() => route(`/project/task/${row._id}`)}
                                                                >
                                                                    <Icon className="fas fa-eye" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer> 
                                : 
                                    <img src={birthdays} className={classes.images} alt="birthdays" />  
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default HomePage;
