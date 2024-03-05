import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    backgroundImage:
      "linear-gradient(45deg, rgb(2, 6, 1) 0%, rgb(2, 6, 1) 14.286%,rgb(8, 29, 31) 14.286%, rgb(8, 29, 31) 28.572%,rgb(13, 52, 61) 28.572%, rgb(13, 52, 61) 42.858%,rgb(19, 75, 92) 42.858%, rgb(19, 75, 92) 57.144%,rgb(25, 98, 122) 57.144%, rgb(25, 98, 122) 71.43%,rgb(30, 121, 152) 71.43%, rgb(30, 121, 152) 85.716%,rgb(36, 144, 182) 85.716%, rgb(36, 144, 182) 100.002%)",
  },
}))(LinearProgress);

const Progress = ({ value, loading, ...restProps }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress
          value={value}
          variant="determinate"
          {...restProps}
        />
      </Box>
      <Box minWidth={35}>
        {loading ? (
          <CircularProgress size={12} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(value)}%`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Progress;
