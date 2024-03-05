import React, { useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    Paper,
    Grid,
    Backdrop,
    Chip,
    IconButton,
    Divider,
    InputAdornment,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
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
import { getAllAttendances } from "../../utils/helper";
import { formatDate } from "../../components/Utils/formatDate";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import clsx from "clsx";

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
}));

const Leaderboard = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        getAllAttendances()
            .then((res) => {
                setData(res.data.data);
                setLoading(false);
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

    const handleChangeDate = (date) => {
        setSelectedDate(date);
      };
    
    let filteredRows = () =>
        data === undefined
            ? []
            : data &&
            data.filter((row) => {
                if (search !== "") {
                    return (
                        (row.employee && row.employee.first_name
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1) ||
                        (row.employee && row.employee.last_name
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1) ||
                        (row.location && row.location.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.date && row.date.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.week && row.week.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.timeIn && row.timeIn.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
                        (row.timeOut && row.timeOut.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                      );
                } else {
                    return row;
                }
            });

    let filteredDate = filteredRows();

    filteredRows = () =>
        filteredDate.filter((item) => {
        if (selectedDate !== null) {
            let date = moment(selectedDate, "LL").format("MMMM Do YYYY");
            return (
                item.date.toString().toLowerCase().indexOf(date.toLowerCase()) !== -1
            );
        } else {
            return item;
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Typography variant="overline" gutterBottom className={classes.title}>
                    All Attendance Records
                </Typography>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={3}
                    className={classes.marginBottom}
                >
                    
                    <Grid item>
                        <SearchComponent
                            updateSearch={updateSearch}
                            placeholder="Search..."
                            search={search}
                            ResetSearch={ResetSearch}
                        />
                    </Grid>
                    <Grid item>
                        <DatePicker
                            disableFuture
                            autoOk
                            format="MMMM Do yyyy"
                            views={["year", "month", "date"]}
                            label="Select Date"
                            // disablePast
                            // maxDate={new Date(moment().add(5, "years")._d)}
                            inputVariant="outlined"
                            value={selectedDate}
                            onChange={handleChangeDate}
                            helperText="Current date is set as default"
                            style={{ marginBottom: -20 }}
                            InputProps={{
                                endAdornment: (
                                <>
                                    <Divider
                                        className={classes.divider2}
                                        orientation="vertical"
                                    />
                                    <InputAdornment position="end">
                                    <IconButton
                                        disabled={selectedDate === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDate(null);
                                        }}
                                    >
                                        {selectedDate ? <CloseIcon /> : <FilterListIcon />}
                                    </IconButton>
                                    </InputAdornment>
                                </>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                <Paper>
                    <TableContainer>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Employee</TableCell>
                                    <TableCell>ClockIn Location</TableCell>
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
                                                {row.employee?.first_name && row.employee?.first_name} {" "}
                                                {row?.employee?.last_name && row?.employee?.last_name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.location && row.location}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Chip label={row.timeIn} variant="outlined" 
                                                className={clsx(
                                                    (row.timeIn >= "8:30:00 AM") ? classes.statusRed : classes.statusDarkGreen,
                                                    classes.chip
                                                )}
                                                />
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
                                        <TableCell colSpan={5} />
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
                        rowsPerPageOptions={[25, 40, { label: "All", value: -1 }]}
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
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Leaderboard;
