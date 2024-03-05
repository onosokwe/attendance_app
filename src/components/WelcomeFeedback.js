import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const WelcomeFeedback = ({ profile }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const timeRef = React.useRef();

  //   const handleClick = () => {
  //     setOpen(true);
  //   };
  React.useEffect(() => {
    if (profile) {
      timeRef.current = setTimeout(() => {
        setOpen(true);
      }, 3500);
    }
    return () => clearTimeout(timeRef.current);
  }, [profile]);

  React.useEffect(() => {
    let text;
    let today = new Date(),
      hour = today.getHours();
    if (hour < 12) {
      text = "Good Morning";
    } else if (hour < 18) {
      text = "Good Afternoon";
    } else {
      text = "Good Evening";
    }
    setMessage(text);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    localStorage.setItem("welcome", "welomeuser");
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${message}, ${
          (profile && profile.first_name)
        }`}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default WelcomeFeedback;
