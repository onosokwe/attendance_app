import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Feedback({
  severity,
  message,
  open,
  handleCloseFeed,
  vertical = "top",
  horizontal = "right",
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleCloseFeed}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseFeed} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
