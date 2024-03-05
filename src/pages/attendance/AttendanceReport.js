import React, { useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    Paper,
    Grid,
    Backdrop,
    Avatar,
    Card,
    CardContent,
    darken,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Button,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { TablePaginationActions } from "../../components/TablePaginationActions";
import { formatDate } from "../../components/Utils/formatDate";
import { attendanceAnalytics, getAllAdmins } from "../../utils/helper";
import moment from "moment";
import Feedback from "../../components/Feedback";
import clsx from "clsx";
import ReportAttendanceModal from "./modals/ReportAttendanceModal";

const useStyles = makeStyles((theme) => ({
    title: {
        display: "block",
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontFamily: "Rubik",
        fontWeight: "bold",
    },
    paper: {
        padding: theme.spacing(3),
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    currency: {
        fontWeight: 800,
        lineBreak: "anywhere",
        lineHeight: 1,
        fontSize: 21,
        maxWidth: 250,
    },
    infoText: {
        fontWeight: 600,
        color: darken(theme.palette.common.white, 0.3),
        letterSpacing: 1.5,
        fontSize: 11,
    },
    marginBottom: {
        marginBottom: 30,
    },
    backBtn: {
        letterSpacing: 2.5,
        padding: theme.spacing(1.9),
        paddingLeft: 35,
        paddingRight: 35,
    },
    status: {
        width: "fit-content",
        color: "#979292",
        padding: 6,
        background: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    statusDarkGreen: {
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        color: "#fff",
    },
    statusGreen: {
        borderColor: "#1de9b6",
        backgroundColor: "#1de9b6",
    },
    statusYellow: {
        borderColor: "#fbc02d",
        backgroundColor: "#fbc02d",
    },
    statusRed: {
        borderColor: "#ef5350",
        backgroundColor: "#ef5350",
    },
    statusOrange: {
        borderColor: "#ff9800",
        backgroundColor: "#fbc02d",
    },
}));

const INIT_STATE = {
    employee : "All",
    year:"",
    week:"",
    cycle:"",
    month:"",
};

const AttendanceReport = () => {
    const classes = useStyles();
    const [search] = useState("");
    const [page, setPage] = React.useState(0);
    const [openReport, setOpenReport] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(INIT_STATE);
    const [reports, setData] = useState([]);
    const [counts, setCounts] = useState([]);
    const [employees, setEmployees] = useState("");

    const [date] = useState(new Date());
    const [query, setQuery] = useState(null);

    const [feed, setFeed] = React.useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    useEffect(() => {
        getAllAdmins()
            .then((res) => {
                setEmployees(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            day: (moment(date).format("dddd")) || "",
            date: (date && moment(date).format("MMMM Do YYYY")) || "",
            year: (date && moment(date).format("YYYY")) || "",
            month: (date && moment(date).format("MMMM")) || "",
            lastmonth : (date && moment(date).subtract(1,'months').format("MMMM")) || "",
            week: (moment(date).format("WW")) || "",
            lastweek: (moment(date).subtract(7,'days').format("WW")) || "",
        }));
    }, [date]); 

    useEffect(() => {
        if(state.cycle !== "" && state.employee !== ""){
            let data;
            if(state.cycle === "thisweek"){
                data = {
                    employee: state.employee,
                    year: state.year,
                    cycle: state.cycle,
                    week: state.week,
                }
            }else if(state.cycle === "lastweek"){
                data = {
                    employee: state.employee,
                    year: state.year,
                    cycle: state.cycle,
                    week: state.lastweek,
                }
            }else if(state.cycle === "thismonth"){
                data = {
                    employee: state.employee,
                    year: state.year,
                    cycle: state.cycle,
                    month: state.month,
                }
            }else if(state.cycle === "lastmonth"){
                data = {
                    employee: state.employee,
                    year: state.year,
                    cycle: state.cycle,
                    month: state.lastmonth,
                }
            }
            setQuery(data);
            
            setLoading(true);
            attendanceAnalytics(data)
                .then((res) => {
                    if(res.data.success){
                        setCounts(res.data.sums);
                        setData(res.data.data);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setFeed((prev) => ({
                        ...prev,
                        loading: false,
                        open: true,
                        message: err.response.data.error,
                        success: false,
                    }));
                }); 
        }
    }, [state]);

    const handleOpenReport = () => {
        setOpenReport(true);
    };
    const handleCloseReport = () => {
        setOpenReport(false);
    };
    
    const handleChange = (e) => {
        e.persist();
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    let filteredRows = () =>
        reports === null
            ? reports
            : reports &&
            reports.filter((row) => {
                if (search !== "") {
                    return (
                        row.first_name
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1 ||
                        row.last_name
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1
                    );
                } else {
                    return row;
                }
            });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        rowsPerPage -
        Math.min(
            rowsPerPage,
            (Array(1000).length || filteredRows().length) - page * rowsPerPage
        );

    const handleCloseFeed = () => {
        setFeed((prevState) => ({ ...prevState, open: false }));
    };

    return (
        <div>
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

            <ReportAttendanceModal {...{ openReport, handleCloseReport, query }} />
           
            <Typography variant="overline" gutterBottom className={classes.title}>
                Attendance Reports
            </Typography>

            <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={3}
                className={classes.marginBottom}
            >
                <Grid item md={3} xs={6}>
                    <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Select Employee</InputLabel>
                        <Select
                            name="employee"
                            inputProps={{id: "employee" }}
                            value={state.employee || "All"}
                            onChange={handleChange}
                            
                        >
                            <MenuItem value="All">All Employees</MenuItem>
                            {employees && employees.map((user, i) => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.first_name} {" "} {user.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Select Year</InputLabel>
                        <Select
                            name="year"
                            inputProps={{id: "year"}}
                            value={state.year || ""}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled><em>--- Select ---</em></MenuItem>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Select Cycle</InputLabel>
                        <Select
                            name="cycle"
                            inputProps={{id: "cycle"}}
                            value={state.cycle || ""}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled><em>--- Select ---</em></MenuItem>
                            <MenuItem value="thisweek">This Week ({"Week "} {state.week})</MenuItem>
                            <MenuItem value="lastweek">Last Week ({"Week "} {state.lastweek})</MenuItem>
                            <MenuItem value="thismonth">This Month ({state.month} {state.year})</MenuItem>
                            <MenuItem value="lastmonth">Last Month  ({state.lastmonth} {state.year})</MenuItem>
                            {/* <MenuItem value="date">Choose Date</MenuItem> */}
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={6} fullWidth>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.backBtn}
                        fullWidth
                        onClick={handleOpenReport}
                        disabled={(reports && reports.length > 0) ? false : true}
                    >
                        Export
                    </Button>
                </Grid>
            </Grid>

            {counts && counts.length > 0 ? 
            <Paper className={classes.paper}>
                <Grid
                    container
                    className={classes.gridContainer}
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    {counts && counts.map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Card variant="outlined" square>
                                <CardContent>
                                    <Grid
                                        container
                                        justify="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                        {loading ? (
                                            <div>
                                            <CircularProgress size={20} />
                                            </div>
                                        ) : (
                                            <Typography className={classes.currency}>
                                            {item.count && item.count}
                                            </Typography>
                                        )}

                                        <Typography variant="overline" className={classes.infoText}>
                                            {item.name}
                                        </Typography>
                                        </Grid>
                                        <Grid item>
                                        <Avatar
                                            src="/img/calendar2.svg"
                                            alt="Calendar"
                                            variant="square"
                                        />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                    </Grid> 
                ))}
                </Grid>
            </Paper> : null}

            {reports && reports.length > 0 ? 
            <Paper style={{marginTop: 30}}>
                <TableContainer>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>TimeIn</TableCell>
                                <TableCell align="center">TimeOut</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredRows().slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : filteredRows()
                            ).map((row, i) => {
                                return (
                                    <TableRow hover key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.employee?.first_name && row.employee?.first_name} {" "}
                                            {row?.employee?.last_name && row?.employee?.last_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Chip
                                            label={formatDate(moment, row.date)}
                                            variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Chip label={row.timeIn} variant="outlined"  />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >
                                            <Chip
                                                label={row.timeOut ? row.timeOut : "-- • --"}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Chip
                                                style={{ padding: 10 }}
                                                label={row.timeIn}
                                                variant="outlined"
                                                className={clsx(
                                                    (row.timeIn >= "8:30:00 AM") ? classes.statusRed : classes.statusDarkGreen,
                                                    classes.chip
                                                )}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            {filteredRows().length === 0 && (
                                <TableRow hover>
                                    <TableCell
                                        colSpan={10}
                                        align="center"
                                        style={{ color: "#616161" }}
                                        component="th"
                                        scope="row"
                                    >
                                        No Records To Display
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={3}
                    count={filteredRows().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
            : null}

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default AttendanceReport;