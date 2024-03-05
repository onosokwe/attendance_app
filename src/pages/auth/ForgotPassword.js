import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles, CircularProgress, fade } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TelegramIcon from "@material-ui/icons/Telegram";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";

import Swal from "sweetalert2";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "#011b33",
    // backgroundColor: theme.palette.type === "light" ? "#011b33" : "#303030",
    background: "url(/img/bg_image.png)",
    // backgroundImage: "url(/img/login.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    color: "#fefefe",
    overflow: "hidden",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 30,
  },
  centered: {
    textAlign: "center",
  },
  card: {
    margin: "0 auto",
    position: "relative",
    marginTop: 100,
    padding: theme.spacing(6),
    maxWidth: 650,
    [theme.breakpoints.down("sm")]: {
      //   maxWidth: 200,
      width: "100%",
      padding: 20,
    },
    // zIndex: 3,
  },
  form: {
    // width: "100%"
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  btn: {
    padding: theme.spacing(2),
    letterSpacing: 2.5,
  },
  container: {
    // paddingTop: theme.spacing(4),

    width: "100%",
  },
  loginText: {
    display: "block",
    fontWeight: "bold",
    letterSpacing: 1.5,
    fontSize: 20,
    lineHeight: 1.5,
  },
  link: {
    fontSize: 10.5,
    letterSpacing: 2.5,
    color: theme.palette.type === "light" ? grey[800] : "#fff",
    marginTop: 10,
    padding: theme.spacing(1.2),
    transition: "all 200ms ease-out",
    "&:hover": {
      letterSpacing: 4.5,
    },
  },
  logoAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
    marginBottom: 25,
    boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",

    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      marginBottom: 20,
    },
  },
  logoText: {
    fontWeight: 900,
    letterSpacing: 1.5,
    fontSize: 26,
    color:
      theme.palette.type === "light"
        ? fade(theme.palette.common.black, 0.75)
        : "#fff",
    textDecoration: "none",
    display: "inline-block",
  },
  icon: {
    width: 28,
    height: 28,
  },
  icon2: {
    animation: "$fadeInLeft 1.3s ease-in-out infinite",
  },
  "@keyframes fadeInLeft": {
    "0%": {
      transform: "translateX(0px)",
      opacity: 1,
    },
    "50%": {
      transform: "translateX(-2px)",
      opacity: 0,
    },
    "100%": {
      transform: "translateX(0px)",
      opacity: 1,
    },
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const baseURL = "https://kloka-api-b0c0cc5775ef.herokuapp.com/api";

  const handleChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    let data = {
      email,
      path: "resetpassword",
    };

    axios.post(baseURL + "/user/forgotpass", data)
    .then((res)=> {

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
        showConfirmButton: false,
        timer: 9000,
        timerProgressBar: true,
      });
      
      setTimeout(() => {
        history.push("/login");
      }, 15000);


    }).catch((err)=> {
      
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
        showConfirmButton: false,
        timer: 9000,
        timerProgressBar: true,
      });
    });
    
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.centered}>
          {" "}
        </div>

        <form
          className={clsx(classes.centered, classes.form)}
          onSubmit={handleSubmit}
        >
          <Typography
            align="center"
            variant="overline"
            gutterBottom
            className={classes.loginText}
          >
            Forgot Your Password?
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            color="primary"
            fullWidth
            className={classes.textField}
            required
            name="email"
            value={email}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.btn}
            disabled={!email || loading}
            endIcon={
              loading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                <TelegramIcon fontSize="large" className={classes.icon} />
              )
            }
          >
            {loading ? "Loading..." : "Email Me"}
          </Button>
        </form>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={() => history.push("/")}
          startIcon={
            <ChevronLeftIcon fontSize="small" className={classes.icon2} />
          }
        >
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default ForgotPassword;
