import React, { useState, useEffect } from "react";
import {
    makeStyles,
    AppBar,
    IconButton,
    Dialog,
    Toolbar,
    Tooltip,
    DialogContent,
    Backdrop,
    Paper,
} from "@material-ui/core";
// import { Document, Page, StyleSheet, PDFViewer, } from "@react-pdf/renderer";

import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { attendanceAnalytics } from "../../../utils/helper";
// import Attendance from '../Attendance';

const useStyles = makeStyles((theme) => ({
    title: {
        display: "block",
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontFamily: "Rubik",
        fontWeight: "bold",
    },
    title2: {
        display: "block",
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontWeight: "bold",
        fontFamily: "Rubik",
    },
    title3: {
        display: "block",
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontFamily: "Rubik",
    },
    container: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(6),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: 20,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

// const styles = StyleSheet.create({
//     header: {
//         fontSize: 13,
//         marginBottom: 10,
//         textAlign: 'center',
//         color: 'grey',
//         marginTop: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: "#888",
//         borderLeftStyle: "solid",
//         textTransform: "capitalize",
//         paddingBottom: 10,

//     },
//     page: {
//         backgroundColor: "#fff",
//         color: "black",
//         fontSize: 12,
//         textAlign: "left",
//         fontWeight: 400,
//         lineHeight: 1.5,
//     },
//     viewer: {
//         width: "100%",
//         height: window.innerHeight,
//     },
//     logo: {
//         width: 74,
//         height: 66,
//         marginLeft: 'auto',
//         marginRight: 'auto'
//     }
// });

// const MyDocument = ({ report, query }) => {
//     return (
//         <PDFViewer style={styles.viewer}>
//             <Document >
//                 <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>
//                     <Attendance 
//                         data={report} 
//                         query={query}
//                     />
//                 </Page>
//             </Document>
//         </PDFViewer>
//     );
// }

const AttendanceReport = ({ openReport, handleCloseReport, query }) => {
    const classes = useStyles();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        attendanceAnalytics(query)
            .then((res) => {
                if(res.data.success){
                    setReport(res.data);
                } 
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data.error);
                setLoading(false);
            });
    }, [query]);
    
    console.log(report)

    return (
        <div>
            <Dialog
                open={openReport}
                onClose={handleCloseReport}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                fullScreen
                maxWidth="md"
            >
                <AppBar
                    className={classes.appBar}
                    variant="elevation"
                    position="fixed"
                    color="inherit"
                >
                    <Toolbar>
                        <Tooltip title="close" arrow>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseReport}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div>
                        <Paper style={{ padding: 20, marginTop: 75, marginBottom: 15 }}>
                            {/* <MyDocument 
                                report={report} 
                                query={query} 
                            />  */}
                        </Paper>

                    </div>
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AttendanceReport;
