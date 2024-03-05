import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import TableChartOutlined from "@material-ui/icons/TableChartOutlined";
import WorkIcon from "@material-ui/icons/Work";
import ListRounded from "@material-ui/icons/ReceiptRounded";
import { makeStyles, fade } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    activeBorder: {
        background: "rgba(255, 255, 255, 0.05 )",
        backdropFilter: "blur(10px)",
        borderRight: "5px solid #fcce0d",
    },
    active: {
        color: fade("#fcce0d", 0.8),
        fontWeight:"bold",
    },
    activeInner: {
        color: fade("#009688", 0.8),
    },
    hoverBorder: {
        "&:hover": {
        background: "rgba( 255, 255, 255, 0.05 )",
        backdropFilter: "blur(10px)",
        color: "#fcce0d",
        borderRight: "5px solid #fcce0d",
        transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
        animation: "$fadeIn 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
    "@keyframes fadeIn": {
        from: {
            opacity: 0.5,
            color: fade("#fcce0d", 0.8),
            borderRight: `5px solid ${fade("#fcce0d", 0.8)}`,
        },
        to: {
            opacity: 1,
            color: "#fcce0d",
            borderRight: "5px solid #fcce0d",
        },
    },
    iconColor: {
        color:
        theme.palette.type === "light"
            ? "#fcce0d"
            : "#fff",
    },
}));

export const SideBarItems = () => {
    const classes = useStyles();
    const location = useLocation();
   
    const matchRoute = (path) => {
        return location.pathname === path;
    };

    const routerLink = (path) => {
        window.location.href = path;
    };
    
    return (
        <div>
            <ListItem button className={clsx( matchRoute("/dashboard") && classes.activeBorder, classes.hoverBorder)} 
                onClick={() => routerLink("/dashboard")}>
                <ListItemIcon>
                    <DashboardIcon className={classes.iconColor} />
                </ListItemIcon>
                <ListItemText
                    primary="Dashboard"
                    className={clsx(matchRoute("/dashboard") && classes.active)}
                />
            </ListItem>

            <ListItem button className={clsx( matchRoute("/attendance/clockin") && classes.activeBorder, classes.hoverBorder)} 
                onClick={() => routerLink("/attendance/clockin")}>
                <ListItemIcon>
                    <AccessTimeRoundedIcon className={classes.iconColor} />
                </ListItemIcon>
                <ListItemText
                    primary="ClockIn"
                    className={clsx(matchRoute("/attendance/clockin") && classes.active)}
                />
            </ListItem>

            <ListItem button className={clsx( matchRoute("/attendance/records") && classes.activeBorder, classes.hoverBorder)} 
                onClick={() => routerLink("/attendance/records")}>
                <ListItemIcon>
                    <ListRounded className={classes.iconColor} />
                </ListItemIcon>
                <ListItemText
                    primary="Attendance Records"
                    className={clsx(matchRoute("/attendance/records") && classes.active)}
                />
            </ListItem>

            <ListItem button className={clsx( matchRoute("/attendance/all") && classes.activeBorder, classes.hoverBorder)} 
                onClick={() => routerLink("/attendance/all")}>
                <ListItemIcon>
                    <TableChartOutlined className={classes.iconColor} />
                </ListItemIcon>
                <ListItemText
                    primary="All Attendance Records"
                    className={clsx(matchRoute("/attendance/all") && classes.active)}
                />
            </ListItem>

            <ListItem button className={clsx( matchRoute("/attendance/report") && classes.activeBorder, classes.hoverBorder)} 
                onClick={() => routerLink("/attendance/report")}>
                <ListItemIcon>
                    <WorkIcon className={classes.iconColor} />
                </ListItemIcon>
                <ListItemText
                    primary="Attendance Report"
                    className={clsx(matchRoute("/attendance/report") && classes.active)}
                />
            </ListItem>
        </div>
    );
};
