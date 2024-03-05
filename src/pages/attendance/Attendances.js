import React, { useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    Paper,
    Grid,
    Backdrop,
    Chip,
    Button,
    Card,
    Avatar,
    CardContent,
    darken,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import SearchComponent from "../../components/SearchComponent";
import { TablePaginationActions } from "../../components/TablePaginationActions";
import { getMyAttendances, getLoggedInUser, attendanceAnalytics  } from "../../utils/helper";
import { formatDate } from "../../components/Utils/formatDate";
import moment from "moment";
import clsx from "clsx";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        display: "block",
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontFamily: "Rubik",
        fontWeight: "bold"
    },
    textField: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
    },

    action: {
        marginBottom: 30,
    },
    btn: {
        marginTop: 30,
        marginBottom: 30,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    table: {
        minWidth: 500,
    },
    chip: {
        paddingLeft: 8,
        paddingRight: 8,
    },
    statusDarkGreen: {
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        color:"#fff",
    },
    statusRed: {
        borderColor: "#ef5350",
        backgroundColor: "#ef5350",
        color:"#fff",
    },
    marginBottom: {
        marginBottom: 30,
    },
    divider2: {
        height: 28,
        margin: 4,
    },
    createBtn: {
        letterSpacing: 2.5,
        padding: theme.spacing(1.2),
        paddingLeft: 20,
        paddingRight: 20,
    },
    gridContainer: {
        marginBottom: 20,
    },
    currency: {
        fontWeight: 400,
        lineBreak: "anywhere",
        lineHeight: 1,
        fontSize: 18,
        maxWidth: 250,
    },
    infoText: {
        fontWeight: 600,
        color: darken(theme.palette.common.white, 0.3),
        letterSpacing: 2.5,
        fontSize: 11,
    },
}));

const Attendances = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countLoading, setCountLoading] = useState(true);
    const history = useHistory();

    const [profile, setLoggedinUser] = React.useState({});
    const TOKEN = localStorage.getItem("kloka:token:data");
    const [counts, setCounts] = React.useState([]);

    React.useEffect(() => {
        if(TOKEN){
            getLoggedInUser(TOKEN)
                .then((res1) => {
                    setLoggedinUser(res1.data.data);
                })
                .catch((err1) => {
                    console.log(err1.response.data.error);
                });
        }
        }, [TOKEN]);

    React.useEffect(() => {
        setCountLoading(true);
        if(profile && profile._id){
            let data = {
                employee: profile._id,
                year: "2023",
                week: moment(new Date(), "LL").format("WW"),
            }

            attendanceAnalytics(data)
                .then((res) => {
                    if(res.data.success){
                        setCounts(res.data.sums);
                        setCountLoading(false);
                    }
                })
                .catch((err) => {
                    setCountLoading(false);
                    console.log(err.response.data.error);
                });
        }
        }, [profile]);

    useEffect(() => {
        getMyAttendances()
            .then((res) => {
                if(res.data.success){
                    setData(res.data.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
            });
      }, []);

    const updateSearch = (e) => {
        setSearch(e.target.value.substr(0, 20));
    };

    const ResetSearch = (e) => {
        e.preventDefault();
        setSearch("");
    };
    
    let filteredRows = () =>
        data === undefined
            ? []
            : data &&
            data.filter((row) => {
                if (search !== "") {
                    return (
                        (row.employee &&
                          row.employee.first_name
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1) ||
                        (row.location &&
                          row.location.toLowerCase().indexOf(search.toLowerCase()) !==
                            -1) ||
                        (row.date &&
                          row.date.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.week &&
                          row.week.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.timeIn &&
                          row.timeIn.toLowerCase().indexOf(search.toLowerCase()) !==
                            -1) ||
                        (row.timeOut &&
                          row.timeOut.toLowerCase().indexOf(search.toLowerCase()) !== -1)
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

    return (
        <div>
            <Typography variant="overline" gutterBottom className={classes.title}>
                My Attendance Records
            </Typography>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={3}
                className={classes.marginBottom}
            >
                <Grid item>
                    <Button
                        color={profile && profile.attendanceStatus === "clocked in" ? "secondary" : "primary"}
                        variant="contained"
                        className={classes.createBtn}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => history.push("/attendance/clockin")}
                    >
                        {profile && profile.attendanceStatus === "clocked in" ? "Clock Out" : "Clock In"}
                    </Button>
                </Grid>
                <Grid item>
                    <SearchComponent
                        updateSearch={updateSearch}
                        placeholder="Search..."
                        search={search}
                        ResetSearch={ResetSearch}
                    />
                </Grid>
            </Grid>

            {counts && counts.length > 0 ? 
                <Grid
                    container
                    className={classes.gridContainer}
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                {counts && counts.map((item, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Card variant="outlined" square={true}>
                            <CardContent>
                                <Grid
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Grid item>
                                        {countLoading ? (
                                            <div>
                                                <CircularProgress size={20} />
                                            </div>
                                        ) : (
                                            <Typography className={classes.currency}>
                                                {item.count && item.count}
                                            </Typography>
                                        )}

                                        <Typography variant="overline" className={classes.infoText}>
                                            {item.name && item.name}
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
            </Grid> : null}

            <Paper>
                <TableContainer>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>ClockIn Location</TableCell>
                                <TableCell>Latitude</TableCell>
                                <TableCell>Longitude</TableCell>
                                <TableCell>Week</TableCell>
                                <TableCell>TimeIn</TableCell>
                                <TableCell align="center">TimeOut</TableCell>
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
                                            <Chip
                                            label={formatDate(moment, row.date)}
                                            variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.location && row.location}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.latitude && row.latitude}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.longitude && row.longitude}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.week}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Chip label={row.timeIn} variant="outlined" 
                                            className={clsx(
                                                (row.timeIn >= "8:30:00 AM") ? classes.statusRed : classes.statusDarkGreen,
                                                classes.chip
                                            )} />
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
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Attendances;
