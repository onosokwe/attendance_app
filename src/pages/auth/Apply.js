import React, { useState, useEffect } from "react";
import { TextField, Typography, Paper, makeStyles, Grid, darken, Backdrop,
    Button,
 } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Feedback from "../../components/Feedback";
import logo from '../../assets/logo.png';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    titlePaper: {
        padding: theme.spacing(3),
        marginBottom: 55,
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(26), 
        marginRight: theme.spacing(26),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
            marginLeft: theme.spacing(3), 
            marginRight: theme.spacing(3),
            marginBottom: 0,
        },
    },
    title: {
        display: "block",
        fontSize: 22,
        lineHeight: 1.5,
        fontFamily: "Rubik",
        fontWeight: "bold",
        textAlign:'center',
        paddingBottom: 10,
    },
    details: {
        display: "block",
        fontSize: 16,
        textTransform:"capitalize",
        fontFamily: "Rubik",
        textAlign:'center',
        paddingBottom: 10,
    },

    personalPaper: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(6),
        marginBottom: 55,
        marginLeft: theme.spacing(26), 
        marginRight: theme.spacing(26),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
            marginLeft: theme.spacing(3), 
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(3),
            marginBottom: 0,
        },
    },
    title2: {
        display: "block",
        fontSize: 22,
        lineHeight: 1.5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomStyle:'solid',
        fontFamily: "Rubik",
        fontWeight: "bold",
        textAlign:'left',
        paddingBottom: 10,
        marginBottom: 30,
    },
    title3: {
        display: "block",
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 1.5,
        fontFamily: "Rubik",
        fontWeight:'bold',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomStyle:'solid',
        paddingBottom: 10,
        marginBottom: 15,
    },
    homePaper: {
        padding: theme.spacing(6),
        paddingTop: theme.spacing(4),
        marginTop: theme.spacing(6),
        marginBottom: 55,
        marginLeft: theme.spacing(4), 
        marginRight: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
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
    paper2: {
        padding: theme.spacing(3),
        marginBottom: 20,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
        marginTop: 20, 
        background: darken("#fff", 0.15),
    },
    paper3: {
        padding: theme.spacing(3),
        marginBottom: 20,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
        marginTop: 20, 
        background: darken("#fff", 0.08),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    saveBtn: {
        fontFamily: "Rubik",
        letterSpacing: 2.5,
        margin: "30px 0",
        padding: theme.spacing(2),
        width: 200,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    saveBtn2: {
        fontFamily: "Rubik",
        letterSpacing: 2.5,
        margin: "30px 0",
        padding: theme.spacing(2),
        width: 200,
        background: "#388e3c",
        color: "#fff",
        "&:hover": {
            background: darken("#388e3c", 0.15),
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    backBtn: {
        letterSpacing: 2.5,
        padding: theme.spacing(1.2),
        paddingLeft: 20,
        paddingRight: 20,
    },
    top_bg: {
        backgroundColor: "#001c41",
        padding: 20,

    },
    top_bg_img: {
        height: 40,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btnWrapper: {
        textAlign: "center",
    },
}));


const INIT_STATE = {
    jobUrl: "",
    jobRole:"",
    jobDescription: "",
    jobRequirement: "",
    min_qualification: "",
    experience_level: "",
    organization:"",
    status: "",
};

const Apply = () => {
    const classes = useStyles();
    const { id } = useParams();    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [job, setJob] = useState("");
    const [state, setState] = useState(INIT_STATE);
    
    // const baseURL = "http://localhost:9000/api";
    const baseURL = "https://kloka-api-b0c0cc5775ef.herokuapp.com/api";

    const [feed, setFeed] = useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(baseURL + `/recruitment/jobopening/public/${id}`)
            .then((res)=> {
                console.log(res.data)
                setJob(res.data.data)
                setLoading(false);
            }).catch((err)=> {
                console.log(err.response)
                setLoading(false);
                setError(err.response.data)
            });
    },[id]);

    useEffect(() => {
        if (error && error !== null) {
            setFeed((prev) => ({
                loading: false,
                open: !prev.open,
                message: error,
                success: false,
            }));
        }
    }, [error]);

    useEffect(() => {
        if(job){
            setLoading(true);
            setState((prev) => ({
                ...prev,
                jobRole: (job && job.jobRole) || "",
                jobDescription: (job && job.jobDescription) || "",
                jobRequirement: (job && job.jobRequirement) || "",
                min_qualification: (job && job.min_qualification) || "",
                experience_level: (job && job.experience_level) || "",
                organization: (job && job.organization) || "",
                status: (job && job.status) || "",
            }));
        }
    }, [job]);

    const handleChange = (e) => {
        e.persist();
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        setFeed((prev) => ({
            loading: false,
            open: !prev.open,
            message: "Your Feedback Has Been Submitted Successfully.",
            success: true,
        }));

        const externalUrl = 'https://kloka-c2e61353eb09.herokuapp.com';

        setTimeout(() => {
            Swal.fire({
                icon: "success",
                title: "Your Feedback Has Been Submitted Successfully.",
            }).then((result) => {
                if(result){
                    window.location.href = externalUrl;
                }
            });
        }, 1500);

        setTimeout(() => {
            window.location.href = externalUrl;
        }, 6000);
    };

    const handleCloseFeed = () => {
        setFeed((prevState) => ({ ...prevState, open: false }));
    };

    const validCheck = () =>
        !state.firstName ||
        !state.lastName ||
        !state.email ||
        !state.phone ||
        !state.resume;

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
            <>
                <Grid item className={classes.top_bg}>
                    <img src={logo} className={classes.top_bg_img} alt="Logo" />
                </Grid>

                <Paper className={classes.titlePaper} >
                    <Typography variant="overline" className={classes.title}>
                        {state.jobRole && state.jobRole}
                    </Typography>
                    <Typography variant="overline" className={classes.details}>
                        {state.experience_level && state.experience_level} {" "}|{" "} 
                        {state.min_qualification && state.min_qualification} {" "}|{" "} 
                        {state.experience_level && state.experience_level}
                    </Typography>
                </Paper>
                
                <Paper className={classes.personalPaper}>
                    
                    <Typography variant="overline" className={classes.title2}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                name="firstName"
                                label="First Name"
                                placeholder="First Name"
                                value={(state.firstName && state.firstName) || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="lastName"
                                label="Last Name"
                                placeholder="Last Name"
                                required
                                value={(state.lastName && state.lastName) || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                label="Email Address"
                                placeholder="Email Address"
                                required
                                type="email"
                                value={(state.email && state.email) || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                placeholder="Phone Number"
                                required
                                value={(state.phone && state.phone) || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                
                <Paper className={classes.personalPaper}>

                    <Typography variant="overline" className={classes.title2}>
                        Details
                    </Typography>

                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} md={12}>
                            <label style={{ fontWeight: "bold" }}>How much professional experience you have with React.js and Node.js? Please explain in detail.</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                placeholder="How much professional experience you have with React.js and Node.js? Please explain in detail."
                                rows={4}
                                name="comment"
                                value={(state.comment && state.comment) || ""}
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    
                    <div className={classes.btnWrapper}>
                        <Button
                            type="submit"
                            className={classes.saveBtn}
                            disabled={loading || validCheck()}
                            color="primary"
                            onClick={handleSubmitHandler}
                            variant="contained"
                        >
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </Paper>
            </>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Apply;
