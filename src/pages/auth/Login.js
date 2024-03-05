import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    makeStyles,
    Checkbox,
    darken,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import instance from "../../utils/instance";

import clsx from "clsx";
import Feedback from "../../components/Feedback";
import logo from '../../assets/logo.png';
import bgImage from '../../assets/bg_image.png';

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
        width: 450,
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

const Login = ({  error }) => {
    const classes = useStyles();
    const history = useHistory();

    const [isPassword, showIsPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [feed, setFeed] = useState({
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const [state, setState] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
        open: false,
        message: "",
        success: false,
    });

    const handleRemember = (e) => {
        setRemember(e.target.checked);
    };

    const showVisibility = () => {
        showIsPassword(!isPassword);
    };

    const handleChange = (e) => {
        e.persist();
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    useEffect(() => {
        const abortController = new AbortController();
        const token = localStorage.getItem("kloka:token:data");
        if (token) {
            history.push("/dashboard");
        }
        return () => {
            abortController.abort();
        };
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeed((prev) => ({...prev, loading: true}));
        const { email, password } = state;
        const data = { email, password };
        try {
            const response = await instance.post("/user/login", data);
            
            console.log(response.data)
            
            setFeed({
                open: !feed.open,
                loading: false,
                message: "Logged In Successfully",
                success: true,
            });

            localStorage.setItem("kloka:token:data", response.data.token);
            localStorage.setItem("kloka:role", response.data.user.role); 
            localStorage.setItem("kloka:type", response.data.user.type);            
            localStorage.setItem(
                "kloka:categories",
                JSON.stringify(response.data.user.categories)
            );
            
            history.push("/dashboard");

        } catch (error) {

            console.log(error.response)

            setFeed({
                open: !feed.open,
                loading: false,
                success: false,
                message: error && error.response.data.error,
            });
            return;
        }
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
          Please enter your details to login
        </Typography>
        <form className={clsx(classes.form)} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={state.email}
            className={classes.textField}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
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

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                name="remember"
                onChange={handleRemember}
              />
            }
            label="Remember Me"
          />

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            className={classes.btn}
            disabled={!state.email || !state.password || state.loading}
            endIcon={
              state.loading ? (
                <CircularProgress size={15} color="primary" />
              ) : (
                <ExitToAppIcon />
              )
            }
          >
            {state.loading ? "Loading..." : "Sign in"}
          </Button>

          <Grid container alignContent="space-between">
            <Grid item md={12} xs={12} style={{ marginBottom: 10, textAlign:"center" }}>
              <Link to="/forgotpass" className={classes.link}>
                Forgot Password?
              </Link>
            </Grid>
          </Grid>

        </form>
      </Card>
      <Backdrop className={classes.backdrop} open={feed.loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
