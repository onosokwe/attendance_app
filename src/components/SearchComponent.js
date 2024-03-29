import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 350,
    width: "100%",
    // marginBottom: "30px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchComponent({
  updateSearch,
  placeholder,
  search,
  ResetSearch,
}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": { placeholder } }}
        onChange={updateSearch}
        value={search}
      />

      <Divider className={classes.divider} orientation="vertical" />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        disabled={!search}
        onClick={ResetSearch}
      >
        {search ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
}
