import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    makeStyles,
    darken,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import clsx from "clsx";
import Feedback from "../../components/Feedback";
import logo from '../../assets/logo.png';
import bgImage from '../../assets/bg_image.png';
import { useParams } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.type === "light" ? "#fff" : "#303030",
        background: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        color: "#fefefe",
        overflow: "hidden",
    },
    centered: {
        textAlign: "center",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
  },
    card: {
        borderRadius:0,
        padding: theme.spacing(6),
        background: darken("#fff", 0.05),
        width: 750,
        minHeight: "100vh",
        marginRight:"auto",
        marginLeft:"auto",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "50%",
            width: "100%",
            padding: theme.spacing(4),
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "100%",
            width: "100%",
            padding: theme.spacing(4),
        },
    },
    form: {
        // width: "100%"
    },
    textField: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    btn: {
        margin: "30px 0",
        padding: theme.spacing(3),
        // background: "#388e3c",
        backgroundColor:'#0064f8',
        height:45,
        borderRadius: 5,
        color: "#fff",
        "&:hover": {
            background: darken("#0064f8", 0.15),
        },
    },
    loginText: {
        fontWeight: "300",
        fontSize: 15,
        margin: 10,
    },
    link: {
        fontSize: 10,
        fontWeight: 400,
        color: theme.palette.type === "light" ? theme.palette.primary.main : "#fff",
        textTransform: "capitalize",
    },
}));

const ResetPassword = ({  error }) => {
    const classes = useStyles();
    const { token }  = useParams();
    const history = useHistory();

    const [isPassword, showIsPassword] = useState(false);
    const [isPassword2, showIsPassword2] = useState(false);

    const [feed, setFeed] = useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const [state, setState] = useState({
        first_name:"",
        last_name:"",
        email: "",
        password: "",
        confirm_password: "",

        error: false,
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const showVisibility = () => {
        showIsPassword(!isPassword);
    };

    const showVisibility2 = () => {
        showIsPassword2(!isPassword2);
    };

    const handleChange = (e) => {
        e.persist();
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    useEffect(() => {
        async function getResetUser() {
            const baseURL = "https://kloka-api-b0c0cc5775ef.herokuapp.com/api";

            axios.post(baseURL + `/user/resetuser/${token}`)
                .then((res)=> {
                    setState((prevState) => ({
                        ...prevState,
                        first_name: res.data.data.first_name,
                        last_name: res.data.data.last_name,
                        email: res.data.data.email,
                    }));
                })
                .catch((err)=> {
                    setState((prevState) => ({
                        ...prevState,
                        error: err.response.data.error,
                    }));
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response.data.error,
                        showConfirmButton: false,
                        timer: 9000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        history.push("/login");
                    }, 15000);
                });
        }

        getResetUser();

    }, [token, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }));

        setFeed((prev) => ({...prev, loading: true}));
        const { email, password } = state;
        const data = { email, password };

        const baseURL = "https://kloka-api-b0c0cc5775ef.herokuapp.com/api";

        axios.post(baseURL + `/user/resetpassword/${token}`, data)
            .then((res)=> {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 9000,
                    timerProgressBar: true,
                });

                setFeed({
                    open: !feed.open,
                    loading: false,
                    success: true,
                    message: res.data && res.data.message,
                });
            })
            .catch((err) => {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.error,
                    showConfirmButton: false,
                    timer: 9000,
                    timerProgressBar: true,
                });

                setFeed({
                    open: !feed.open,
                    loading: false,
                    success: false,
                    message: err && err.response.data.error,
                });
            });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCloseFeed = () => {
        setFeed((prevState) => ({ ...prevState, open: false }));
    };

    return (
        <div className={classes.root} style={{backgroundColor:'#0064f8'}}>
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
                    message={feed.message || (error && error.error)}
                />
            )}

            <Card className={classes.card}>
                <div className={classes.centered}>
                    <img src={logo} alt="Logo" style={{width: 160, height: 34}} />
                </div>

                <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    className={classes.loginText}
                >
                    Reset Your Password
                </Typography>

                {!state.error ? <>
                
                
                
                <form className={clsx(classes.form)} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Your First Name"
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={`${state.first_name}`}
                                className={classes.textField}
                                disabled
                                required
                                fullWidth
                                variant="outlined"
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Your Last Name"
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={`${state.last_name}`}
                                className={classes.textField}
                                disabled
                                required
                                fullWidth
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={state.email}
                        className={classes.textField}
                        disabled
                        required
                        fullWidth
                        variant="outlined"
                    />
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="password"
                                name="password"
                                label="New Password"
                                value={state.password}
                                onChange={handleChange}
                                variant="outlined"
                                type={isPassword ? "text" : "password"}
                                color="primary"
                                fullWidth
                                className={classes.textField}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showVisibility}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {isPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="confirm_password"
                                name="confirm_password"
                                label="Confirm New Password"
                                value={state.confirm_password}
                                onChange={handleChange}
                                variant="outlined"
                                type={isPassword2 ? "text" : "password"}
                                color="primary"
                                fullWidth
                                className={classes.textField}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showVisibility2}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {isPassword2 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        fullWidth
                        className={classes.btn}
                        disabled={!state.password || !state.confirm_password || state.loading}
                    >
                        {state.loading ? "Loading..." : "Submit"}
                    </Button>

                </form>
                
                </> : null}

            </Card>
            <Backdrop className={classes.backdrop} open={state.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default ResetPassword;
